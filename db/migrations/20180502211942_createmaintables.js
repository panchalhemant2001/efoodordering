
exports.up = function(knex, Promise) {
  return Promise.all([
knex.schema.createTable('foods', function(table) {
     table.increments('foodId');
     table.decimal('price');
     table.string('foodName');
     table.string('description');
     table.integer('calories');
     table.string('imageURL');
   }),

   knex.schema.createTable('restaurants', function(table) {
     table.increments('restaurantId');
     table.string('cellNumber');
     table.string('street');
     table.string('city');
     table.string('unitNumber');
     table.string('email');
   }),
   knex.schema.createTable('orders', function (table) {
     table.increments('order_id');
     table.string('user_name');
     table.string('user_cell_number');
     table.json('cartItems');
     table.decimal('total_price');
     table.decimal('tax');
     table.decimal('order_total');
     table.string('order_status');
     table.integer('paymentOptions').default(0);
    })
   ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTableIfExists('foods'),
      knex.schema.dropTableIfExists('restaurants'),
      knex.schema.dropTableIfExists('orders')
    ])
};
