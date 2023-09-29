import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Meals } from "../entity/MealEntity";

export class MealsRepo extends AbstractRepo<Meals> {
  async getPriceFromIds(ids: any[]) {
    const res = await Meals.query().select("id", "amount").whereIn("id", ids);
    return res;
  }
}
