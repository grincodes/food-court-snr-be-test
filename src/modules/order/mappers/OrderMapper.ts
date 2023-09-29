import { Logger } from "@nestjs/common";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { Order } from "../domain/Order";
import { Orders } from "../infra/entity/OrderEntity";

export class OrderMap {
  public static toPersistence(order: Order): Partial<Orders> {
    return {
      id: order.id,
      user_id: order.user_id,
      calculated_order_id: order.calculated_order_id,
      order_type_id: order.order_type_id,
      paid: order.paid,
      scheduled: order.scheduled,
    };
  }

  public static toDomain(raw: any): Order {
    const orderOrError = Order.create(
      {
        user_id: raw.user_id,
        calculated_order_id: raw.calculated_order_id,
        order_type_id: raw.order_type_id,
        paid: raw.paid,
        scheduled: raw.scheduled,
      },
      new UniqueEntityID(raw.id)
    );

    orderOrError.isFailure ? Logger.debug(orderOrError.error) : "";

    return orderOrError.isSuccess ? orderOrError.getValue() : null;
  }
}
