
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('foods').insert(
          {
            price: "15.99",
            foodName: "Double Cheese Decker",
            description: "Made with 100% grass fed beef, topped with lettuce, tomatoes, red onions & a slice of melty chedder cheese. * NO pickles",
            calories: "730",
            imageURL: "https://images.unsplash.com/photo-1512224519710-fdd86054f573?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff09483b711cd12fe0d4e014acd5d6ca&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "12.99",
            foodName: "Chicken Burger",
            description: "Breaded, crispy chicken topped with red cabbage, tangy pickles, & black olives.",
            calories: "650",
            imageURL: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=d78e78bf715baa67c7f6473b66984581&auto=format&fit=crop&w=675&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "17.99",
            foodName: "Turkey Bacon Burger",
            description: "A perfect marriage between juicy, lightly smoked turkey & 5 crispy slices of bacon. Topped with lettuce, tomatoes, cheese & and our secrete sauce.",
            calories: "937",
            imageURL: "https://images.unsplash.com/photo-1501197827945-7d2594e437b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1048b6d1d2cfd556e1f28d6762102802&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "13.99",
            foodName: "Pulled Pork Burger",
            description: "Delicious pulled pork burger topped with pineapples, onions, & red cabbage.",
            calories: "1085",
            imageURL: "https://i.pinimg.com/originals/be/9b/f3/be9bf319f6a0658d57ebbab85b7c5b2c.jpg"
          }
        ),
        knex('foods').insert(
          {
            price: "18.99",
            foodName: "Angus Burger",
            description: "100% pure Canadian angus topped with 3 types of cheese, lettuce, tomatoes, and onions.",
            calories: "890",
            imageURL: "https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9f2d35c4ea30a81e428e66c653748f91&auto=format&fit=crop&w=500&q=60"
          }
        ),
        knex('foods').insert(
          {
            price: "11.99",
            foodName: "The Impossible Burger",
            description: "The same great tasting burger....but 100% vegan.",
            calories: "560",
            imageURL: "https://images.unsplash.com/photo-1508424897381-4fd8755e4b7a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79896d89532ce982c53efebba2883a6b&auto=format&fit=crop&w=675&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "3.99",
            foodName: "Fries",
            description: "Cripsy golden, lightly salted fries.",
            calories: "400",
            imageURL: "https://images.unsplash.com/photo-1523475886877-7cc3b40b8093?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ecaa6be8126e7b4c0ed19ccca57ba692&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "4.99",
            foodName: "Sweet Potato Fries",
            description: "Sweet and delicious sweet potato fries.",
            calories: "230",
            imageURL: "https://images.unsplash.com/photo-1520944052104-261c48c33a35?ixlib=rb-0.3.5&s=b2351c348478cd09a5ca77cc213b5497&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "8.99",
            foodName: "Salad",
            description: "A fresh blend of vegetables and fruits with rice on the side.",
            calories: "340",
            imageURL: "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3637911ee7fd91ef9087dae6efc0114f&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "2.99",
            foodName: "Cold-Brew Coffee",
            description: "Cold-Brew Coffee",
            calories: "300",
            imageURL: "https://images.unsplash.com/photo-1502156473420-13f1315e9be4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=593a9e420053a4d1b5560afc0f92b76d&auto=format&fit=crop&w=500&q=60"
          }
        ),
        knex('foods').insert(
          {
            price: "4.99",
            foodName: "Milkshake",
            description: "Milkshake",
            calories: "400",
            imageURL: "https://images.unsplash.com/photo-1502719414926-613118be79d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=33c47ed538ba787c2466de7b4ad22754&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "4.99",
            foodName: "Strawberry Smoothie",
            description: "Strawberry Smoothie",
            calories: "280",
            imageURL: "https://images.unsplash.com/photo-1506458961255-571f40df5aad?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=749c4675fc14c04ff8d0ea75cff5da87&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "7.99",
            foodName: "Beer",
            description: "Beer",
            calories: "330",
            imageURL: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82d7aeb8df6ae2af22bfc04afb7e970c&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "8.99",
            foodName: "Wine",
            description: "Wine",
            calories: "290",
            imageURL: "https://images.unsplash.com/photo-1513618781222-67f7db0dab6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbd3cef323cd615feca9e3292e5910c&auto=format&fit=crop&w=634&q=80"
          }
        ),
        knex('foods').insert(
          {
            price: "9.99",
            foodName: "Mojito",
            description: "Mojito",
            calories: "500",
            imageURL: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9be45969a82da44b4d8a8d6283d3a2a2&auto=format&fit=crop&w=500&q=60"
          }
        ),
        knex('foods').insert(
          {
            price: "0.99",
            foodName: "Screwdriver",
            description: "Hair of the dog that bit you",
            calories: "500",
            imageURL: "https://images.unsplash.com/photo-1522427088495-81d38b91befb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bfb4c22b9ecee528176b3fefc5cc391d&auto=format&fit=crop&w=1846&q=80"
          }
        )
      ]);
    });
};
