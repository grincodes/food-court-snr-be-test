import { BaseModel } from "src/libs/db/BaseModel";

export class Users extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        email: { type: "string" },
        pasword: { type: "string" },
        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  email: string;
  password:string;
  roles: string|string[]
}

