import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectionToken } from "../injectionToken";

import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { OrderLogsRepo } from "../infra/repository/OrderLogsRepo";
import { CreateOrderLogDto } from "../dto/CreateOrderLogDto";
import { OnEvent } from "@nestjs/event-emitter";
import { Events } from "src/libs/constants";

@Injectable()
export class OrderLogsService {
  @Inject(InjectionToken.ORDER_LOGS_REPO)
  private readonly ordersLogsRepo: OrderLogsRepo;

  async createOrderLog(dto: CreateOrderLogDto) {
    try {
      const id = new UniqueEntityID();
      dto.id = id.toValue() as bigint;

      const res = await this.ordersLogsRepo.save(dto);
      return {
        id: res.id,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedOrderLogs(pageSize: number, currentPage: number) {
    try {
      const orderLogs = await this.ordersLogsRepo.findPaginated(
        pageSize,
        currentPage
      );
      return orderLogs;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  @OnEvent(Events.ORDER_STATUS_UPDATED)
  async addOrderLog(event) {
    try {
      await this.createOrderLog(event);
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
