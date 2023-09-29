import "reflect-metadata";
import { Meal, MealProps } from "../Meal";

let validMeal: MealProps;
let invalidMeal: any;

describe("Meal Add On", () => {
  beforeEach(() => {
    validMeal = {
      name: "Mio mio",
      new: false,
      brand_id: 123n,
      amount: 300,
      images: [],
      meal_category_id: 123n,
      meal_keywords: [],
      description: "mio mio description",
    };

    invalidMeal = {
      name: "Mio mio",
      new: false,
      brand_id: 123,
      amount: 300,
      images: [],
      meal_category_id: 123,
      meal_keywords: [],
      description: "",
    };
  });

  describe("create Meal", () => {
    it("should create meal ", () => {
      const mealOrError = Meal.create(validMeal);
      expect(mealOrError.isSuccess).toBeTruthy();
    });
  });

  describe("validate Meal", () => {
    it("should return an error result when provided invalid props", () => {
      const mealOrError = Meal.create(invalidMeal);
      expect(mealOrError.isSuccess).toBeFalsy();
    });
  });
});
