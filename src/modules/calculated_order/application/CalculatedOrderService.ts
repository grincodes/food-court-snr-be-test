import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectionToken } from "../injectionToken";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { CalculatedOrdersRepo } from "../infra/repository/CalculatedOrdersRepo";
import { CreateCalculatedOrderDto } from "../dto/CreateCalculatedOrderDto";
import { CalculatedOrderMap } from "../mappers/CalculatedOrderMapper";
import { CalculatedOrder } from "../domain/CalculatedOrder";
import { ConfirmPricingService } from "../../confirm_pricing/ConfirmPricingService";

@Injectable()
export class CalculatedOrderService {
  @Inject(InjectionToken.CALCULATED_ORDER_REPO)
  private readonly calculatedOrdersRepo: CalculatedOrdersRepo;

  @Inject()
  confirmPricingService: ConfirmPricingService;
  async calculateOrder(dto: CreateCalculatedOrderDto) {
    try {
      //process  that confirms if all prices are still valid
      const validationRes =
        await this.confirmPricingService.validatePriceFromPayload(dto.meals);

      if (
        validationRes.addonsNotFound.length ||
        validationRes.addonsWithDifferentPrices.length ||
        validationRes.mealsNotFound.length ||
        validationRes.mealsWithDifferentPrices.length
      ) {
        throw new ConflictException({
          message: {
            message: "Invalid order due to data inconsistencies",
            ...validationRes,
          },
        });
      }

      const calculatedOrderOrError = CalculatedOrder.create(dto);

      if (calculatedOrderOrError.isFailure) {
        throw new BadRequestException(calculatedOrderOrError.errorValue());
      }

      const calculatedOrder = calculatedOrderOrError.getValue();

      const data = CalculatedOrderMap.toPersistence(calculatedOrder);

      const res = await this.calculatedOrdersRepo.save(data);

      return {
        id: res.id,
        free_delivery: res.free_delivery,
        food_price: (
          +res.total_amount -
          +res.delivery_fee -
          +res.service_charge
        ).toString(),
        total_amount: res.total_amount,
        delivery_fee: res.delivery_fee,
        service_charge: res.service_charge,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getCalculatedOrderById(id: bigint) {
    try {
      const res = await this.calculatedOrdersRepo.findById(id);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async getAllPaginatedCalculatedOrders(pageSize: number, currentPage: number) {
    try {
      const res = await this.calculatedOrdersRepo.findPaginated(
        pageSize,
        currentPage
      );
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async updateCalculatedOrder(
    id: bigint,
    dto: Partial<CreateCalculatedOrderDto>
  ) {
    try {
      const res = await this.calculatedOrdersRepo.updateById(id, dto);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteCalculatedOrder(id: bigint) {
    try {
      const res = await this.calculatedOrdersRepo.deleteById(id);
      return {
        status: !!res,
      };
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
