import { Logger } from "@nestjs/common";
import { Addon } from "../domain/Addon";
import { Addons } from "../infra/entity/AddonsEntity";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";

export class AddonMap {
  public static toPersistence(addOn: Addon): Partial<Addons> {
    return {
      id: addOn.id,
      name: addOn.name,
      brand_id: addOn.brand_id,
      active: addOn.active,
      amount: addOn.amount,
      min_selection_no: addOn.min_selection_no,
      internal_profit: addOn.internal_profit,
      item_type: addOn.item_type,
      meal_category_id: addOn.meal_category_id,
    };
  }

  public static toDomain(raw: any): Addon {
    const addOnOrError = Addon.create(
      {
        brand_id: raw.brand_id,
        name: raw.name,
        active: raw.active,
        amount: raw.amount,
        min_selection_no: raw.min_selection_no,
        internal_profit: raw.internal_profit,
        item_type: raw.item_type,
        meal_category_id: raw.meal_category_id,
      },
      new UniqueEntityID(raw.id)
    );

    addOnOrError.isFailure ? Logger.debug(addOnOrError.error) : "";

    return addOnOrError.isSuccess ? addOnOrError.getValue() : null;
  }
}
