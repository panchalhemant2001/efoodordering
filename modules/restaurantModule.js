const settings = require("./settings_knex");

var knex = require('knex')(settings.development);

//get all food items
var getAllFoodItems = function getAllFoodItems() {
  return knex.select("*")
  .from("foods");
}




//get restaurant details by restaurant id
var getRestaurantDetailsById = function getRestaurantDetailsById(restid) {
  return knex.select("*")
  .from("restaurants")
  .where({"restaurantId": restid});
}



var addNewRestaurantDetails = function addNewRestaurantDetails(restObj) {
  return knex.insert(restObj).into("restaurants");
}



var deleteRestaurantDetailsById = function deleteRestaurantDetailsById(restid) {
  return knex( "restaurants" ).del().where( "restaurantId", restid);
}


module.exports = {
  getAllFoodItems: getAllFoodItems,
  getRestaurantDetailsById: getRestaurantDetailsById,
  addNewRestaurantDetails: addNewRestaurantDetails,
  deleteRestaurantDetailsById: deleteRestaurantDetailsById
}
