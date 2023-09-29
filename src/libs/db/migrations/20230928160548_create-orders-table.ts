import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", function (table) {
    table.bigInteger("id").primary();

    table
      .bigInteger("calculated_order_id")
      .references("id")
      .inTable("calculated_orders");

    table
      .bigInteger("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.bigInteger("order_type_id").references("id").inTable("order_types");

    table.boolean("paid");
    table.boolean("scheduled");
    table.bigInteger("rider_id");
    table.string("order_code");

    table.boolean("completed").defaultTo(false);
    table.string("completed_time");
    table.boolean("kitchen_prepared").defaultTo(false);
    table.boolean("rider_assigned").defaultTo(false);
    table.string("kitchen_verified_time");
    table.string("kitchen_completed_time");
    table.boolean("cancelled").defaultTo(false);
    table.boolean("kitchen_cancelled").defaultTo(false);
    table.boolean("kitchen_accepted").defaultTo(false);
    table.boolean("kitchen_dispatched").defaultTo(false);
    table.string("kitchen_dispatched_time");

    table.boolean("is_failed_trip").defaultTo(false);
    table.string("rider_started_time");
    table.boolean("rider_started").defaultTo(false);
    table.string("rider_arrived_time");
    table.boolean("rider_arrived").defaultTo(false);

    table.bigInteger("confirmed_by_id");
    table.bigInteger("completed_by_id");
    table.string("scheduled_delivery_date");
    table.string("scheduled_delivery_time");
    table.boolean("is_hidden").defaultTo(false);
    table.string("createdAt");
    table.string("updatedAt");
    table.integer("version");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
