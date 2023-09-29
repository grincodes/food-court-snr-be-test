import { BaseModel } from "src/libs/db/BaseModel";

export class OrderLogs extends BaseModel {
  static get tableName() {
    return "order_logs";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        description: { type: "string" },
        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  order_id:bigint;
  description: string;
}
