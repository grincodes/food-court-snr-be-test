import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectionToken } from "../injectionToken";
import { MealsRepo } from "../infra/repository/MealsRepo";
import { CreateMealDto } from "../dto/CreateMealDto";
import { Meal } from "../domain/Meal";
import { MealMap } from "../mappers/MealMapper";
import { handleErrorCatch } from "src/libs/common/helpers/utils";

@Injectable()
export class MealService {
  @Inject(InjectionToken.MEAL_REPO)
  private readonly mealsRepo: MealsRepo;

  async createMeal(dto: CreateMealDto) {
    try {
      const exists = await this.mealsRepo.exists({ name: dto.name });

      if (exists) {
        throw new ConflictException("Meal  already exists");
      }

      const mealOrError = Meal.create(dto);

      if (mealOrError.isFailure) {
        throw new BadRequestException(mealOrError.errorValue());
      }

      const meal = mealOrError.getValue();

      const data = MealMap.toPersistence(meal);

      const res = await this.mealsRepo.save(data);

      return {
        id: res.id,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getMealById(id: bigint) {
    try {
      const res = await this.mealsRepo.findById(id);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedMeals(pageSize: number, currentPage: number) {
    try {
      const res = await this.mealsRepo.findPaginated(pageSize, currentPage);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateMeal(id: bigint, dto: Partial<CreateMealDto>) {
    try {
      const res = await this.mealsRepo.updateById(id, dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteMeal(id: bigint) {
    try {
      const res = await this.mealsRepo.deleteById(id);
      return {
        status: !!res,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getPriceFromIds(ids: bigint[]) {

    try {
      const res = await this.mealsRepo.getPriceFromIds(ids)
      return res
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
