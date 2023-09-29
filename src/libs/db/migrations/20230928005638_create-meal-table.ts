import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("meals", function (table) {
    table.bigInteger("id").primary();
    table
      .bigInteger("brand_id")
      .references("id")
      .inTable("brands")
      .onDelete("CASCADE");
    table.string("name");
    table.boolean("new").defaultTo(true);
    table.boolean("active").defaultTo(true);
    table.integer("amount");
    table.string("description");
    table.specificType("images", "text[]");
    table.specificType("meal_keywords", "text[]");
    table.bigInteger("meal_category_id");
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("meals");
}
