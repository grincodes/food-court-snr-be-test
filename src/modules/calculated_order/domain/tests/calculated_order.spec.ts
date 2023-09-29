import "reflect-metadata";
import { CalculatedOrder, CalculatedOrderProps } from "../CalculatedOrder";

let validCalculatedOrder: CalculatedOrderProps;
let invalidCalculatedOrder: CalculatedOrderProps;

describe("Calculated Order", () => {
  beforeEach(() => {
    validCalculatedOrder = {
      total_amount: "3000",
      free_delivery: false,
      address_details: {
        time: "2023-05-17T11:04:38.448Z",
        city: "Lekki",
        name: "Current",
        address_line: "Lekki, Lagos, Nigeria",
        building_number: "No.",
      },

      meals: [
        {
          id: 123n,
          brand_id: 11n,
          quantity: 2,
          amount: 500,
          name: "Jollof Rice",
          addons: [
            {
              id: 34n,
              brand_id: 11n,
              name: "beef",
              quantity: 2,
              amount: 300,
            },

            {
              id: 32n,
              brand_id: 11n,
              name: "salad",
              quantity: 1,
              amount: 200,
            },
          ],
        },
      ],

      lat: "50.32",
      lng: "32.90",
      user_id: 245n,
      cokitchen_polygon_id: 22n,
      cokitchen_id: 21n,
      pickup: false,
    };

    invalidCalculatedOrder = {
      total_amount: "3000",
      free_delivery: false,
      address_details: {
        time: "2023-05-17T11:04:38.448Z",
        city: "Lekki",
        name: "Current",
        address_line: "Lekki, Lagos, Nigeria",
        building_number: "No.",
      },

      meals: [
        {
          id: 123n,
          brand_id: 11n,
          quantity: 2,
          amount: 500,
          name: "Jollof Rice",
          addons: [
            {
              id: 34n,
              name: "beef",
              quantity: 2,
              amount: 300,
            },

            {
              id: 32n,
              name: "salad",
              quantity: 1,
              amount: 200,
            },
          ],
        },
      ],

      lat: "50.32",
      lng: "32.90",
      user_id: 245n,
      cokitchen_polygon_id: 22n,
      cokitchen_id: 21n,
      pickup: false,
    };
  });

  describe("calculate Order ", () => {
    it("should calculate order ", () => {
      const calculatedOrderOrError =
        CalculatedOrder.create(validCalculatedOrder);
      expect(calculatedOrderOrError.isSuccess).toBeTruthy();
    });
  });

  describe("validate Calculated Order", () => {
    it("should return an error result when provided invalid props", () => {
      const calculatedOrderOrError = CalculatedOrder.create(
        invalidCalculatedOrder
      );
      expect(calculatedOrderOrError.isSuccess).toBeFalsy();
    });
  });
});
