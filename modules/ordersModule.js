const settings = require('./settings_knex');

const knex = require('knex')(settings.development);

var connectToDB = function() {

  return knex('orders').insert([{id: 1}])
}
// knex.insert({
//     user_name: "Hemant Panchal",
//     user_cell_number: "23456",
//     cartItems: {"id": "111", "item": "pizza"},
//     total_price: 20,
//     tax: 2.60,
//     order_total: 22.60,
//     order_status: "pending",
//     paymentOptions: 1
//   }).into("orders").then(function (id) {
//   console.log(id);
// }).catch((err)=>{
// console.log(err);
// });
// }


/*  knex('orders').insert({
    user_name: "Hemant Panchal",
    user_cell_number: "23456",
    cartItems: {"id": "111", "item": "pizza"},
    total_price: 20,
    tax: 2.60,
    order_total: 22.60,
    order_status: "pending",
    paymentOptions: 1
  })
*/


/*
.then(
    function(rows) {
      knex.destroy();
    })
  .catch(
    function(err) {
      console.log(err);
    }
  );*/

  module.exports = {
    connectToDB: connectToDB
  }

  /*.then(
    function(rows) {
      callback(rows);
      knex.destroy();
    })
  .catch(
    function(err) {
      console.log(err);
    }
  );*/


/*function printFamousPeople(rows) {
  console.log("Searching...");
  console.log("Found " + rows.length + " person(s) by the name " + nameToSearch);

  for(let i = 0; i < rows.length; i++) {

    console.log("- " + (i+1) + ": " + rows[i].first_name +
      " " + rows[i].last_name + ", born " +
      "'" + rows[i].birthdate.toISOString().substr(0,10) + "'");
  }
}*/

