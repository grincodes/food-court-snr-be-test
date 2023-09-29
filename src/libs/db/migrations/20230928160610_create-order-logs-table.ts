import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("order_logs", function (table) {
    table.bigInteger("id").primary();
    table
      .bigInteger("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table.string("description");
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order_logs");
}


