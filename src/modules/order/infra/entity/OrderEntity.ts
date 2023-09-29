import { BaseModel } from "src/libs/db/BaseModel";
import { Users } from "src/modules/auth/users/entity/UsersEntity";
import { CalculatedOrders } from "src/modules/calculated_order/infra/entity/CalculatedOrderEntity";
import { OrderLogs } from "src/modules/order_logs/infra/entity/OrderLogsEntity";
import { OrderTypes } from "src/modules/order_type/infra/entity/OrderTypesEntity";


export class Orders extends BaseModel {
  static get tableName() {
    return "orders";
  }

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },

      order_type: {
        relation: BaseModel.HasOneRelation,
        modelClass: OrderTypes,
        join: {
          from: "orders.order_type_id",
          to: "order_types.id",
        },
      },

      order_logs: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderLogs,
        join: {
          from: "orders.id",
          to: "order_logs.order_id",
        },
      },
      calculated_order: {
        relation: BaseModel.HasOneRelation,
        modelClass: CalculatedOrders,
        join: {
          from: "orders.calculated_order_id",
          to: "calculated_orders.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        paid: { type: "boolean" },
        scheduled: { type: "boolean" },

        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  user_id: bigint;
  calculated_order_id: bigint;
  rider_id: bigint;
  order_type_id: bigint;
  paid: boolean;
  scheduled: boolean;

  order_code: string;
  completed: boolean;
  completed_time: string;
  kitchen_prepared: boolean;
  rider_assigned: boolean;
  kitchen_verified_time: string;
  kitchen_completed_time: string;
  cancelled: boolean;
  kitchen_cancelled: boolean;
  kitchen_accepted: boolean;
  kitchen_dispatched: boolean;
  kitchen_dispatched_time: string;

  is_failed_trip: boolean;
  rider_started_time: string;
  rider_started: boolean;
  rider_arrived_time: string;
  rider_arrived: boolean;
  confirmed_by_id: bigint;
  completed_by_id: bigint;
  scheduled_delivery_date: string;
  scheduled_delivery_time: string;
  is_hidden: boolean;


}
