const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const db = require("../connection");

router.get("/", (req, res) => {
  db("teams")
    .select("*")
    .then(teams => {
      if (!teams.length)
        return res.status(404).send("Hm, can't seem to find any teams.");
      return res.status(200).send(teams);
    })
    .catch(err => {
      res.status(500).send({ error: err.message, stack: err.stack });
    });
});

router.get("/:id", (req, res) => {
  db("teams")
    .where({ id: parseInt(req.params.id) })
    .then(team => {
      if (!team.length)
        return res
          .status(404)
          .send("Sorry, there was no team found matching that id.");
      return res.status(200).send(team[0]);
    })
    .catch(err => {
      res.status(500).send({ err: err.message, stack: err.stack });
    });
});

router.post("/", (req, res) => {
  const { error } = validateTeamSchema(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  db("teams")
    .insert(req.body)
    .then(() =>
      res.status(201).send(`team has been added to database... ${req.body}`)
    )
    .catch(err => res.status(500).send(err));
});

function validateTeamSchema(team) {
  const schema = {
    name: Joi.string().required(),
    sport: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    coach: Joi.string().required()
  };
  return Joi.validate(team, schema);
}

module.exports = router;
