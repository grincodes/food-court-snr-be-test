import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("addons", function (table) {
    table.bigInteger("id").primary();
    table
      .bigInteger("brand_id")
      .references("id")
      .inTable("brands")
      .onDelete("CASCADE");
    table.string("name");
    table.boolean("active").defaultTo(true);
    table.integer("amount");
    table.integer("min_selection_no");
    table.integer("internal_profit").defaultTo(0);
    table.string("item_type");
    table.bigInteger("meal_category_id");
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("addons");
}
