import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { MealsRepo } from "./infra/repository/MealsRepo";
import { Meals } from "./infra/entity/MealEntity";
import { MealController } from "./infra/http/MealController";
import { MealService } from "./application/MealService";


const infrastructure = [
  {
    provide: InjectionToken.MEAL_REPO,
    useFactory: () => {
      return new MealsRepo(Meals);
    },
  },
];

@Module({
  controllers: [MealController],
  providers: [Logger, ...infrastructure, MealService],
  exports:[MealService]
})
export class MealModule {}
