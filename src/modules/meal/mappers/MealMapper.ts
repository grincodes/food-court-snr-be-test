import { Logger } from "@nestjs/common";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { Meals } from "../infra/entity/MealEntity";
import { Meal } from "../domain/Meal";

export class MealMap {
  public static toPersistence(meal: Meal): Partial<Meals> {
    return {
      id: meal.id,
      name: meal.name,
      new:meal.new,
      description:meal.description,
      brand_id: meal.brand_id,
      active: meal.active,
      amount: meal.amount,
      images: meal.images,
      meal_keywords:meal.meal_keywords,
      meal_category_id: meal.meal_category_id,
    };
  }

  public static toDomain(raw: any): Meal {
    const mealOrError = Meal.create(
      {
        
        name: raw.name,
        new: raw.new,
        description: raw.description,
        brand_id: raw.brand_id,
        active: raw.active,
        amount: raw.amount,
        images: raw.images,
        meal_keywords: raw.meal_keywords,
        meal_category_id: raw.meal_category_id,
      },
      new UniqueEntityID(raw.id)
    );

    mealOrError.isFailure ? Logger.debug(mealOrError.error) : "";

    return mealOrError.isSuccess ? mealOrError.getValue() : null;
  }
}
