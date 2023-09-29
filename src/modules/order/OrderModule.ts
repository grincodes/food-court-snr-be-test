import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { OrdersRepo } from "./infra/repository/OrdersRepo";
import { Orders } from "./infra/entity/OrderEntity";
import { OrderController } from "./infra/http/OrderController";
import { OrderService } from "./application/OrderService";

const infrastructure = [
  {
    provide: InjectionToken.ORDERS_REPO,
    useFactory: () => {
      return new OrdersRepo(Orders);
    },
  },
];

@Module({
  controllers: [OrderController],
  providers: [Logger, ...infrastructure, OrderService],
})
export class OrderModule {}
