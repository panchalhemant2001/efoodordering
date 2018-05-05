const settings = require("./settings_knex");

var knex = require('knex')(settings.development);

var addOrderDetails = function addOrderDetails(orderObj) {
/*
  { txtname: 'Hemantkumar Panchal',
    cell: '+16677889919',
    txtamount: '126.91',
    txttax: '16',
    txtordertotal: '142.91',
    payoption: '0',
    orderitems:
     { '323222':
        { foodid: '323222',
          price: ' 15.99',
          foodName: 'Mondo Burger',
          quantity: '4' },
       '2342342':
        { foodid: '2342342',
          price: ' 10.99',
          foodName: 'Big Gulp',
          quantity: '3' },
       '098234':
        { foodid: '098234',
          price: ' 14.99',
          foodName: 'Burger',
          quantity: '2' } } }
  */

  let toStoreObj = {
   'user_name': orderObj["txtname"],
   'user_cell_number': orderObj["cell"],
   'cartItems': orderObj["orderitems"],
   'total_price': orderObj["txtamount"],
   'tax': orderObj["txttax"],
   'order_total': orderObj["txtordertotal"],
   'order_status': "pending",
   'paymentOptions': orderObj["payoption"]
  };

  return knex.insert(toStoreObj).into("orders");
}




module.exports = {
  addOrderDetails: addOrderDetails
}
