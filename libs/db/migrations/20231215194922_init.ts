import type { Knex } from "knex";

// Game hasMany releases
// Release hasMany Resources
// Resource is one or more of file or url

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("resources", function (table) {
      table.string("id").unique();
      table.string("uri").primary();
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
    .createTable("platforms", (table) => {
      table.string("code").primary();
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("platform_resource", function (table) {
      table.string("platform_code").references("platforms.code");
      table.string("resource_id").references("resources.id");
      table.primary(["platform_code", "resource_id"]);
    })
    .createTable("release_resource", function (table) {
      table.integer("release_id").unsigned().references("releases.id");
      table.string("resource_id").references("resources.id");
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema;
}
