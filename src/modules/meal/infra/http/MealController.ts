import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { MealService } from "../../application/MealService";
import { CreateMealDto } from "../../dto/CreateMealDto";
import { TestGetPricesDto } from "../../dto/TestGetPricesDto";

@Controller("v1/meal")
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get("/")
  async getAllPaginatedMeals(@Query() data: any) {
    const res = await this.mealService.getAllPaginatedMeals(
      data.size,
      data.page
    );
    return res;
  }

  @Get("/:id")
  async getMeal(@Param("id") id: string) {
    const res = await this.mealService.getMealById(BigInt(id));
    return res;
  }

  @Post("/")
  async createMeal(@Body() dto: CreateMealDto) {
    const res = await this.mealService.createMeal(dto);
    return res;
  }

  @Put("/:id")
  async patchMeal(
    @Param("id") id: string,
    @Body() dto: Partial<CreateMealDto>
  ) {
    const res = await this.mealService.updateMeal(BigInt(id), dto);
    return res;
  }

  @Delete("/:id")
  async deleteMeal(@Param("id") id: string) {
    const res = await this.mealService.deleteMeal(BigInt(id));
    return res;
  }
}
