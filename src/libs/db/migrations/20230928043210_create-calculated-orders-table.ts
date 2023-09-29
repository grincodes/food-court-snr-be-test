import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("calculated_orders", function (table) {
    table.bigInteger("id").primary();
    table
      .bigInteger("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("total_amount");
    table.boolean("free_delivery");
    table.string("delivery_fee");
    table.string("service_charge");
    table.jsonb("address_details");
    table.jsonb("meals");
    table.string("lat");
    table.string("lng");
    table.bigInteger("cokitchen_polygon_id");
    table.bigInteger("cokitchen_id");
    table.boolean("pickup");
    table.string("prev_price");
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("calculated_orders");
}
