const settings = require('./settings_knex');

const knex = require('knex')(settings);

function connectToDB(options, callback) {
  knex.select('*')
  .from('famous_people')
  .where(knex.raw('first_name = ? or last_name = ?', [options, options]))
  .then(
    function(rows) {
      callback(rows);
      knex.destroy();
    })
  .catch(
    function(err) {
      console.log(err);
    }
  );
}


function printFamousPeople(rows) {
  console.log("Searching...");
  console.log("Found " + rows.length + " person(s) by the name " + nameToSearch);

  for(let i = 0; i < rows.length; i++) {

    console.log("- " + (i+1) + ": " + rows[i].first_name +
      " " + rows[i].last_name + ", born " +
      "'" + rows[i].birthdate.toISOString().substr(0,10) + "'");
  }
}



let nameToSearch = process.argv[2];

connectToDB(nameToSearch,printFamousPeople);
