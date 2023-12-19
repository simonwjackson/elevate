import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {},
  },

  // staging: {
  //   client: "better-sqlite3",
  //   connection: {
  //     filename: "./staging.sqlite3",
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  // production: {
  //   client: "better-sqlite3",
  //   connection: {
  //     filename: "./prod.sqlite3",
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

module.exports = config;
