const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const db = require("../connection");

router.get("/", (req, res) => {
  db("cities")
    .select("*")
    .then(cities => {
      if (!cities.length)
        return res.status(404).send("Hm, can't seem to find any cities.");
      return res.status(200).send(cities);
    })
    .catch(err =>
      res.status(500).send({ error: err.message, stack: err.stack })
    );
});

router.get("/:id", (req, res) => {
  console.log("params", req.params.id);
  db("cities")
    .where({ id: parseInt(req.params.id) })
    .then(city => {
      if (!city.length)
        return res.status(404).send("Hm, can't seem to find that city.");
      return res.status(200).send(city[0]);
    })
    .catch(err => {
      res.status(500).send({ err: err.message, stack: err.stack });
    });
});

router.post("/", (req, res) => {
  const { error } = validateCitySchema(req.body);
  const { city, state } = req.body;
  if (error) return res.status(422).send(error.details[0].message);
  db("cities")
    .insert(req.body)
    .then(() => res.status(201).send(`${city}, ${state}, has been saved!`))
    .catch(err => res.status(500).send(err));
});

router.delete("/:city", (req, res) => {
  const city = req.params.city;
  db("cities")
    .where({ city })
    // .then(matchingCity => {
    //   if (!matchingCity.length)
    //     return res.status(404).send("That city is not in the records.");
    //   matchingCity.del();
    // })
    .del()
    .then(() => res.status(200).send(`${city} has been deleted.`))
    .catch(err => res.status(500).send(err));
});

function validateCitySchema(city) {
  const schema = {
    city: Joi.string().required(),
    state: Joi.string().required(),
    population: Joi.number().required()
  };
  return Joi.validate(city, schema);
}

module.exports = router;
