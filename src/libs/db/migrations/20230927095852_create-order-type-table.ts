import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      return knex.schema.createTable("order_types", function (table) {
        table.bigInteger("id").primary();
        table.string("name");
        table.string("createdAt");
        table.string("updatedAt");
        table.integer("version");
      });
}


export async function down(knex: Knex): Promise<void> {
     return knex.schema.dropTable("order_types");
}

