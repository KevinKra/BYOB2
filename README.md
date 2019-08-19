# BYOB Sports

This file is designed to serve as a practice iteration for interacting with SQL databases and JavaScript.

## Technology

- JavaScript
- PostgreSQL
- Knex

## Routes

### Cities

`GET /api/v1/cities`

- returns a list of all the cities in the database.

`GET /api/v1/cities/:id`

- returns the city object with the matching id.

`POST /api/v1/cities`

- Post a city to the cities database.

```node
 {
   city: String,
   state: String,
   population: Number,
 }
```

`DELETE /api/v1/cities/:id`

- Remove a city from the database with the matching id.

---

### Teams

`GET /api/v1/teams`

- returns a list of all the teams in the database.

`GET /api/v1/cities/:id`

- returns the team object with the matching id.

`POST /api/v1/cities`

- Post a team to the cities database.

```node
 {
   name: String,
   sport: String,
   city: String,
   state: String,
   coach: String
 }
```

`DELETE /api/v1/cities/:team`

- Delete a team from the database with the matching name.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
