const citiesData = require("../../data/cities.json");
const teamsData = require("../../data/teams.json");

const createCities = (knex, city) => {
  return knex("cities").insert(
    {
      city: city.city,
      state: city.state,
      population: city.population
    },
    "id"
  );
};

const createTeams = (knex, team) => {
  return knex("teams").insert({
    name: team.name,
    sport: team.sport,
    city: team.city,
    state: team.state,
    coach: team.coach
  });
};

exports.seed = knex => {
  return knex("cities")
    .del()
    .then(() => knex("teams").del())
    .then(() => {
      const citiesPromises = [];
      citiesData.forEach(city => {
        // console.log(city);
        citiesPromises.push(createCities(knex, city));
      });
      return Promise.all(citiesPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`))
    .then(() => {
      const teamsPromises = [];
      teamsData.forEach(team => {
        teamsPromises.push(createTeams(knex, team));
      });
      return Promise.all(teamsPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`));
};
