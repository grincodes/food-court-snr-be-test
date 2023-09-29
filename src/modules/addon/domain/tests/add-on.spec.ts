import "reflect-metadata";
import { Addon, AddonProps } from "../Addon";

let validAddon: AddonProps;
let invalidAddon: any;

describe("Meal Add On", () => {
  beforeEach(() => {
    validAddon = {
      name: "Mio mio",
      brand_id: 123n,
      amount: 300,
      min_selection_no: 0,
      internal_profit: 0,
      item_type: "Food",
      meal_category_id: 123n,
    };

    invalidAddon = {
      name: "Mio mio",
      brand_id: 123,
      amount: 300,
      min_selection_no: 0,
      internal_profit: 0,
      item_type: "",
      meal_category_id: 123,
    };
  });

  describe("createAddon", () => {
    it("should create addon ", () => {
      const addOnOrError = Addon.create(validAddon);
      expect(addOnOrError.isSuccess).toBeTruthy();
    });
  });

  describe("validate Meal AddOn", () => {
    it("should return an error result when provided invalid props", () => {
      const addOnOrError = Addon.create(invalidAddon);
      expect(addOnOrError.isSuccess).toBeFalsy();
    });
  });
});
