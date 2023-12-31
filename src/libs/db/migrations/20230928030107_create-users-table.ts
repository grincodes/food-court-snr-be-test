import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.bigInteger("id").primary();

    table.string("email");
    table.string("password");
    table.specificType("roles", "text[]");
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable("users");
}
