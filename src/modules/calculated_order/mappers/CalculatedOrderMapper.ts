import { Logger } from "@nestjs/common";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { CalculatedOrders } from "../infra/entity/CalculatedOrderEntity";
import { CalculatedOrder } from "../domain/CalculatedOrder";

export class CalculatedOrderMap {
  public static toPersistence(
    calculatedOrder: CalculatedOrder
  ): Partial<CalculatedOrders> {
    return {
      id: calculatedOrder.id,
      total_amount: calculatedOrder.total_amount,
      free_delivery: calculatedOrder.free_delivery,
      delivery_fee: calculatedOrder.delivery_fee,
      service_charge: calculatedOrder.service_charge,
      address_details: JSON.stringify(calculatedOrder.address_details),
      meals: JSON.stringify(calculatedOrder.meals),
      lat: calculatedOrder.lat,
      lng: calculatedOrder.lng,
      user_id: calculatedOrder.user_id,
      cokitchen_polygon_id: calculatedOrder.cokitcehn_polygon_id,
      cokitchen_id: calculatedOrder.cokitchen_id,
      pickup: calculatedOrder.pickup,
      prev_price: calculatedOrder.prev_price,
    };
  }

  public static toDomain(raw: any): CalculatedOrder {
    const calculatedOrderOrError = CalculatedOrder.create(
      {
        total_amount: raw.total_amount,
        free_delivery: raw.free_delivery,
        delivery_fee: raw.delivery_fee,
        service_charge: raw.service_charge,
        address_details: raw.address_details,
        meals: raw.meals,
        lat: raw.lat,
        lng: raw.lng,
        user_id: raw.user_id,
        cokitchen_polygon_id: raw.cokitcehn_polygon_id,
        cokitchen_id: raw.cokitchen_id,
        pickup: raw.pickup,
        prev_price: raw.prev_price,
      },
      new UniqueEntityID(raw.id)
    );

    calculatedOrderOrError.isFailure
      ? Logger.debug(calculatedOrderOrError.error)
      : "";

    return calculatedOrderOrError.isSuccess
      ? calculatedOrderOrError.getValue()
      : null;
  }
}
