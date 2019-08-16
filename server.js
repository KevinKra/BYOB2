const express = require("express");
const app = express();
const morgan = require("morgan");
const cities = require("./routes/cities");
const teams = require("./routes/teams");

app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));
app.use(express.json());
app.use("/api/v1/cities", cities);
app.use("/api/v1/teams", teams);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Connected to port ${PORT}...`));
