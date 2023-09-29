import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectionToken } from "../injectionToken";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { OrderTypesRepo } from "../infra/repository/OrderTypeRepo";
import { CreateOrderTypeDto } from "../dto/CreateOrderTypeDto";

@Injectable()
export class OrderTypeService {
  @Inject(InjectionToken.ORDER_TYPE_REPO)
  private readonly orderTypesRepo: OrderTypesRepo;

  async createOrderType(dto: CreateOrderTypeDto) {
    try {
      const exists = await this.orderTypesRepo.exists({ name: dto.name });

      if (exists) {
        throw new ConflictException("Order Type  already exists");
      }
      const id = new UniqueEntityID();
      dto.id = id.toValue() as bigint;

      const res = await this.orderTypesRepo.save(dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getOrderTypeById(id: bigint) {
    try {
      const res = await this.orderTypesRepo.findById(id);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedOrderTypes(pageSize: number, currentPage: number) {
    try {
      const brands = await this.orderTypesRepo.findPaginated(
        pageSize,
        currentPage
      );
      return brands;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateOrderType(id: bigint, dto: Partial<CreateOrderTypeDto>) {
    try {
      const res = await this.orderTypesRepo.updateById(id, dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteOrderType(id: bigint) {
    try {
      const res = await this.orderTypesRepo.deleteById(id);
      return {
        status: !!res,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
