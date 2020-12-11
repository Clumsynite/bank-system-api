const options = {
  client: "mysql",
  connection: {
    host: process.env.DB_SERVER,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const knex = require("knex")(options);

knex
  .raw("SELECT VERSION()")
  .then((version) =>
    console.log("Database connected\nVersion: " + version[0][0]["VERSION()"])
  )
  .catch((err) => {
    console.log(err);
    throw err;
  });

knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("users", (table) => {
          table.increments("user_id").primary();
          table.timestamp("joined").defaultTo(knex.fn.now());
          table.string("name");
          table.string("username").unique();
          table.string("password");
          table.string("account");
        })
        .then(() => console.log("users Table created"))
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

knex.schema
  .hasTable("accounts")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("accounts", (table) => {
          table.increments("transaction_id").primary();
          table.timestamp("transaction_time").defaultTo(knex.fn.now());
          table.string("user_id");
          table.integer("cash_withdrawn").defaultTo(0);
          table.integer("cash_deposited").defaultTo(0);
          table.integer("total").defaultTo(0);
        })
        .then(() => console.log("accounts Table created"))
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

module.exports = knex;
