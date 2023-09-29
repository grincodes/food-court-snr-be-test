import { BaseModel } from "src/libs/db/BaseModel";
import { Users } from "src/modules/auth/users/entity/UsersEntity";

export class CalculatedOrders extends BaseModel {
  static get tableName() {
    return "calculated_orders";
  }

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "meals.user_id",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        total_amount: { type: "string" },
        free_delivery: { type: "boolean" },
        delivery_fee: { type: "string" },
        service_charge: { type: "string" },
        lat: { type: "string" },
        lng: { type: "string" },
        pickup: { type: "boolean" },
        prev_price: { type: "string" },

        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  total_amount: string;
  free_delivery: boolean;
  delivery_fee: string;
  service_charge: string;
  address_details: string| Record<string, any>;
  meals: string | Record<string, any>[];
  lat: string;
  lng: string;
  user_id: bigint;
  cokitchen_polygon_id: bigint;
  cokitchen_id: bigint;
  pickup: boolean;
  prev_price?: string;
}
