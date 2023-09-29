import { BaseModel } from "src/libs/db/BaseModel";
import { Brands } from "src/modules/brand/infra/entity/BrandsEntity";

export class Addons extends BaseModel {
  static get tableName() {
    return "addons";
  }

  static get relationMappings() {
    return {
      brands: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Brands,
        join: {
          from: "addons.brand_id",
          to: "brands.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        name: { type: "string" },
        active: { type: "boolean" },
        amount: { type: "number" },
        min_selection_no: { type: "number" },
        item_type: { type: "string" },
        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  name: string;
  brand_id: bigint;
  active: boolean;
  amount: number;
  min_selection_no: number;
  internal_profit: number;
  item_type: string;
  meal_category_id: bigint;
}
