const express = require("express");
const app = express();
const db = require("./connection");
const Joi = require("@hapi/joi");

// app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));
app.use(express.json());

app.get("/api/v1/cities", (req, res) => {
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

app.get("/api/v1/cities/:id", (req, res) => {
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

app.get("/api/v1/teams", (req, res) => {
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

app.get("/api/v1/teams/:id", (req, res) => {
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

app.post("/api/v1/teams", (req, res) => {
  const { error } = validateTeamSchema(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  db("teams")
    .insert(req.body)
    .then(() =>
      res.status(200).send(`team has been added to database... ${req.body}`)
    )
    .catch(err => res.status(500).send(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Connected to port ${PORT}...`));

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
