import "reflect-metadata";
import { Order, OrderProps } from "../Order";

let validOrder: OrderProps;
let invalidOrder: any;

describe("Order", () => {
  beforeEach(() => {
    validOrder = {
      user_id: 34n,
      calculated_order_id: 20n,
      rider_id: 123n,
      order_type_id: 144n,
      paid: true,
      scheduled: false,
    };

    invalidOrder = {
      user_id: 34,
      calculated_order_id: 20,
      rider_id: 123,
      order_type_id: 144,
      paid: "true",
      scheduled: "false",
    };
  });

  describe("create Order", () => {
    it("should create order ", () => {
      const orderOrError = Order.create(validOrder);
      expect(orderOrError.isSuccess).toBeTruthy();
    });
  });

  describe("validate Order", () => {
    it("should return an error result when provided invalid props", () => {
      const orderOrError = Order.create(invalidOrder);
      expect(orderOrError.isSuccess).toBeFalsy();
    });
  });
});
