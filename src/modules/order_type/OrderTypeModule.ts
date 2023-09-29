import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { OrderTypesRepo } from "./infra/repository/OrderTypeRepo";
import { OrderTypes } from "./infra/entity/OrderTypesEntity";
import { OrderTypeController } from "./infra/http/OrderTypeController";
import { OrderTypeService } from "./application/OrderTypeService";

const infrastructure = [
  {
    provide: InjectionToken.ORDER_TYPE_REPO,
    useFactory: () => {
      return new OrderTypesRepo(OrderTypes);
    },
  },
];

@Module({
  controllers: [OrderTypeController],
  providers: [Logger, ...infrastructure, OrderTypeService],
})
export class OrderTypeModule {}
