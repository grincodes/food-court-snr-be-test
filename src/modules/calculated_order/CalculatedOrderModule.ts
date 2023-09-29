import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { CalculatedOrdersRepo } from "./infra/repository/CalculatedOrdersRepo";
import { CalculatedOrders } from "./infra/entity/CalculatedOrderEntity";
import { CalculatedOrderController } from "./infra/http/CalculateOrderController";
import { CalculatedOrderService } from "./application/CalculatedOrderService";
import { ConfirmPricingModule } from "../confirm_pricing/ConfirmPricingModule";

const infrastructure = [
  {
    provide: InjectionToken.CALCULATED_ORDER_REPO,
    useFactory: () => {
      return new CalculatedOrdersRepo(CalculatedOrders);
    },
  },
];

@Module({
  imports: [ConfirmPricingModule],
  controllers: [CalculatedOrderController],
  providers: [Logger, ...infrastructure, CalculatedOrderService],
})
export class CalculatedOrderModule {}
