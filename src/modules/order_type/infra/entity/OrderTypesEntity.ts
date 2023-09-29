import { BaseModel } from "src/libs/db/BaseModel";

export class OrderTypes extends BaseModel {
  static get tableName() {
    return "order_types";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  name: string;
}
