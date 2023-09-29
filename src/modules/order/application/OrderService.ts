import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { InjectionToken } from "../injectionToken";
import { OrdersRepo } from "../infra/repository/OrdersRepo";
import { CreateOrderDto } from "../dto/CreateOrderDto";
import { Order } from "../domain/Order";
import { OrderMap } from "../mappers/OrderMapper";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Events } from "src/libs/constants";

@Injectable()
export class OrderService {
  @Inject(InjectionToken.ORDERS_REPO)
  private readonly ordersRepo: OrdersRepo;

  @Inject()
  private readonly eventEmitter: EventEmitter2;

  async createOrder(dto: CreateOrderDto) {
    try {
      const orderOrError = Order.create(dto);

      if (orderOrError.isFailure) {
        throw new BadRequestException(orderOrError.errorValue());
      }

      const order = orderOrError.getValue();

      const data = OrderMap.toPersistence(order);

      const res = await this.ordersRepo.save(data);

      return {
        id: res.id,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getOrderById(id: bigint) {
    try {
      const res = await this.ordersRepo.findById(
        id,
        "[order_logs,calculated_order]"
      );
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedOrders(pageSize: number, currentPage: number) {
    try {
      const res = await this.ordersRepo.findPaginated(
        pageSize,
        currentPage,
        {},
        "[order_logs,calculated_order]"
      );
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateOrder(id: bigint, dto: Partial<CreateOrderDto>) {
    try {
      const res = await this.ordersRepo.updateById(id, dto);

      this.eventEmitter.emit(Events.ORDER_STATUS_UPDATED, {
        order_id: id.toString(),
        description: "order_updated",
      });

      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async confirmOrder(id: bigint, dto: Partial<CreateOrderDto>) {
    try {
      const res = await this.ordersRepo.updateById(id, dto);

      // throws an event to update order logs
      this.eventEmitter.emit(Events.ORDER_STATUS_UPDATED, {
        order_id: id.toString(),
        description: "order_confirmed",
      });

      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteMeal(id: bigint) {
    try {
      const res = await this.ordersRepo.deleteById(id);
      return {
        status: !!res,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
