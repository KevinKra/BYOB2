exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("cities", table => {
      table.increments("id").primary();
      table.string("city");
      table.string("state");
      table.integer("population");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("teams", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("sport");
      table.string("city");
      table.string("state");
      table.string("coach");
      table.integer("team_id").unsigned();
      table.foreign("team_id").references("cities.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("cities"),
    knex.schema.dropTable("teams")
  ]);
};
