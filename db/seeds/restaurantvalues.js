
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('restaurants').insert(
          {
            restaurantName: "Mikaal Panchal Burgers",
            cellNumber: "2267008540",
            street: "46 Spadina st",
            city: "Toronto",
            unitNumber: "404",
            email: "benyoo@gmail.com"
          }
        )
      ]);
    });
};
