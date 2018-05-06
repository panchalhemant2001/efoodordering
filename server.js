"use strict";
var ordersModule = require("./modules/ordersModule");
var telAPIModule = require("./modules/telAPIModule");
var restaurantModule = require("./modules/restaurantModule");
var ordermodule = require("./modules/ordersModule");
require('dotenv').config();
const settings=require('./settings');

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const stripekeys = require('./stripekeys');

const keyPublishable = stripekeys.keyPublishable;
const keySecret = stripekeys.keySecret;
const stripe = require("stripe")(keySecret);
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  let restdetails = restaurantModule.getRestaurantDetailsById(1)
  .then((rows) => {
    res.render("index", { restdetails: rows});
  })
  .catch((err) => {
    console.log(err);
  });

})


app.get("/data", (req, res) => {
 knex
 .select()
 .from('foods')
 .then(rows => {
   res.json(rows);
 })
});


app.post('/',(req,res) => {
  knex('foods')
    .select()
    .then( (rows) => {res.json(rows)})
    .catch()
})


app.get("/checkout", (req, res) => {
  res.render("checkout");
});


app.post("/checkout", (req, res) => {

 /*
 //===== RECEIVING FOLLOWING ORDER OBJECTS ON CHECKOUT SUBMISSION, WHICH IN THE
 //===== FOLLOWING CODE IS WRITTEN TO COMBINE INTO SINGLE JAVASCRIPT OBJECT AND
 //===== PASSED TO ADD INTO orders DATABASE TABLE
 console.log("body: " , frmJsonObjData);
 console.log("Order items: ", req.body.orderitems);
 */

 let frmArrayData = String(decodeURI(req.body.formdata)).split("&");

 let frmJsonObjData = {};

 for(let key of frmArrayData) {
   let tempArr = key.split("=");
   console.log(tempArr);

   if(tempArr[0] == 'txtordertotal'){
     var totalprice = tempArr[1];
   }

   if(tempArr[0] == "txtname"){
     var customer = tempArr[1];
   }
   //Here cell is a form field name (If you change form field name, please make change it here)
   if(tempArr[0] == "cell") {
     tempArr[1] = "+1" + tempArr[1];
     var cellnum = tempArr[1];
   }

   frmJsonObjData[tempArr[0]] = tempArr[1];
 }


 frmJsonObjData["orderitems"] = req.body.orderitems;  //In this line, whole order details is stored in frmJsonObjData
 console.log(cellnum);
 console.log(customer);

// console.log(req.body.orderitems);
// console.log('FormData', req.body.formdata);
// console.log('Order items', req.body.orderitems);
 console.log(req.body);
 var ordered = JSON.parse(req.body.orderitems);

 var fooditems = "";
 var quantity = "";

 for(var key in ordered){

   quantity += ordered[key].quantity;
   fooditems += `${ordered[key].quantity} - ${ordered[key].foodName}, `

 }
 console.log(fooditems);
 var newfooditems = "";

 for(var i = 0; i < fooditems.length - 1; i++){
   newfooditems += fooditems[i];
 }

 console.log(newfooditems);
 //storing order object into the database here
 ordersModule.addOrderDetails(frmJsonObjData)
 .then((success) => {
   res.send("Order is submitted successfully!");
 })
 .catch((error) => {
   res.send("Error: Order is not submitted!");
 })


 const accountSid = settings.accountSid;
 const authToken = settings.authToken;
 const client = require('twilio')(accountSid, authToken);

 client.messages
 .create({
    body:
    `Hi ${customer}! Thanks for using Bitehouse Labs. This is the summary of your order:
     ${newfooditems}.
    The total for your order today will be $${totalprice}.
    Your meal will be ready in 30 minutes.
    See you then!`,
    from: '+12267991623',
    to: cellnum
  })
 .then(message => console.log(message.sid))
 .done();
 //
 // //sending text message to the restaurant owner
 // let rMsg = "Hey Ben ...it's your turn now!";
 //
 // telAPIModule.sendTextMessage(rMsg, "+12267008540")
 //
 //
 //
 // //sending text message to the customer
 // let cMsg = "Hey Hemant, We Got this working. Sent from the app!!!";
 //
 // telAPIModule.sendTextMessage(cMsg, frmJsonObjData.cell);

});


app.post("/charge", (req, res) => {
  console.log(req.body);
  stripe.tokens.create({
    card: {
      "number": req.body.number,
      "exp_month": req.body.exp_month,
      "exp_year": req.body.exp_year,
      "cvc": req.body.cvc
    }
  })
  .then(token =>
    stripe.customers.create({
     email: req.body.email,
    source: token.id
    })
  )
  .then(customer => {
      stripe.charges.create({
      amount: 50,
      description: "Food ordering",
      currency: "cad",
      customer: customer.id
    })
  })
  .then(charge => {
    let frmArrayData = String(decodeURI(req.body.formdata)).split("&");
    let frmJsonObjData = {};
  for(let key of frmArrayData) {
    let tempArr = key.split("=");
    console.log(tempArr);
    if(tempArr[0] == 'txtordertotal'){
      var totalprice = tempArr[1];
    }
    if(tempArr[0] == "txtname"){
      var customer = tempArr[1];
    }
    //Here cell is a form field name (If you change form field name, please make change it here)
    if(tempArr[0] == "cell") {
      tempArr[1] = "+1" + tempArr[1];
      var cellnum = tempArr[1];
    }
    frmJsonObjData[tempArr[0]] = tempArr[1];
  }
  frmJsonObjData["orderitems"] = req.body.orderitems;  //In this line, whole order details is stored in frmJsonObjData
  console.log(cellnum);
  console.log(customer);
// console.log(req.body.orderitems);
// console.log('FormData', req.body.formdata);
// console.log('Order items', req.body.orderitems);
  console.log(req.body);
  var ordered = JSON.parse(req.body.orderitems);
  var fooditems = "";
  var quantity = "";
  for(var key in ordered){
    quantity += ordered[key].quantity;
    fooditems += `${ordered[key].quantity} - ${ordered[key].foodName}, `
  }
  console.log(fooditems);
  var newfooditems = "";
  for(var i = 0; i < fooditems.length - 2; i++){
    newfooditems += fooditems[i];
  }
  console.log(newfooditems);
  //storing order object into the database here
  ordersModule.addOrderDetails(frmJsonObjData)
 /* .then((success) => {
    res.send("Order is submitted successfully!");
  })
  .catch((error) => {
    res.send("Error: Order is not submitted!");
  })*/
  const accountSid = settings.accountSid;
  const authToken = settings.authToken;
  const client = require('twilio')(accountSid, authToken);
  client.messages
  .create({
     body:
     `Hi ${customer}! Thanks for using Bitehouselabs. This is the summary of your order:
      ${newfooditems}.
     The total for your order today will be $${totalprice}.
     Your meal will be ready in 30 minutes.
     See you then!`,
     from: '+12267991623',
     to: cellnum
   })
  .then(message => console.log(message.sid))
  .done();
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
