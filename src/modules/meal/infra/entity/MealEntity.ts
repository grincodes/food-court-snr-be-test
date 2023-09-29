import { BaseModel } from "src/libs/db/BaseModel";
import { Brands } from "src/modules/brand/infra/entity/BrandsEntity";

export class Meals extends BaseModel {
  static get tableName() {
    return "meals";
  }

  static get relationMappings() {
    return {
      brands: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Brands,
        join: {
          from: "meals.brand_id",
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
        new: { type: "boolean" },
        description: { type: "string" },
        active: { type: "boolean" },
        amount: { type: "number" },
        // images: {
        //   type: "array",
        //   items: {
        //     type: "string",
        //   },
        // },
        // meal_keywords: {
        //   type: "array",
        //   items: {
        //     type: "string",
        //   },
        // },
        createdAt: { type: "string" }, // Automatically populated by the BaseModel
        updatedAt: { type: "string" }, // Automatically updated by the BaseModel
        version: { type: "integer" },
      },
    };
  }

  id: bigint;
  name: string;
  new: boolean;
  description: string;
  brand_id: bigint;
  active: boolean;
  amount: number;
  images: string | string[];
  meal_keywords: string | string[];
  meal_category_id: bigint;
}
