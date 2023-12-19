import type { Knex } from "knex";

// Game hasMany releases
// Release hasMany Resources
// Resource is one or more of file or url

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("resources", function (table) {
      table.increments("id").primary();
      table.string("uri").unique().nullable();
      table.string("md5").nullable();
      table.timestamps(true, true);
    })
    .createTable("releases", function (table) {
      table.increments("id").primary();
      table.integer("platform_code").references("platforms.code").notNullable();
      table.timestamps(true, true);
      table.string("version");
      table.string("name");
      table.date("release_date");
    })
    .createTable("resource_release", function (table) {
      table.integer("resource_uri").unsigned().references("resources.uri");
      table.integer("release_id").unsigned().references("releases.id");
      table.primary(["resource_uri", "release_id"]);
    })
    .createTable("platforms", (table) => {
      table.string("code").primary();
      table.string("name");
      table.timestamps(true, true);
    });
  // .createTable("resources_platforms", function (table) {
  //   table.integer("resource_uri").unsigned().references("resources.uri");
  //   table.integer("platform_code").unsigned().references("platforms.code");
  // });

  // await knex.schema
  //   .createTable("files", function (table) {
  //     table.string("fullPath").primary();
  //   })
  //   .createTable("releases", function (table) {
  //     table.increments("id").primary();
  //     // table.string("file_fullPath").references("files.fullPath");
  //     table.string("date");
  //     table.timestamps(true, true);
  //     // .onDelete("CASCADE");
  //     // table
  //     //   .integer("platform_id")
  //     //   .unsigned()
  //     //   .references("id")
  //     //   .inTable("platforms")
  //     //   .onDelete("CASCADE");
  //   })
  //   .createTable("releases_files", function (table) {
  //     table.integer("file_fullPath").unsigned().references("files.fullPath");
  //     table.integer("release_id").unsigned().references("releases.is");
  //   });
  // .createTable("users", (table) => {
  //   table.increments("id").primary();
  //   table.string("name").notNullable();
  //   table.timestamps(true, true);
  // })
  //
  // .createTable("releases", (table) => {
  //   table.string("fullPath").primary();
  //   table.string("name");
  //   table.integer("platform_code").references("platforms.id").notNullable();
  //   table.timestamps(true, true);
  // })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema;
}
