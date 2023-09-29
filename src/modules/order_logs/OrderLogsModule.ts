import { Logger, Module } from "@nestjs/common";
import { InjectionToken } from "./injectionToken";
import { OrderLogs } from "./infra/entity/OrderLogsEntity";
import { OrderLogsRepo } from "./infra/repository/OrderLogsRepo";
import { OrderLogsController } from "./infra/http/OrderLogController";
import { OrderLogsService } from "./application/OrderLogsService";



const infrastructure = [
  {
    provide: InjectionToken.ORDER_LOGS_REPO,
    useFactory: () => {
      return new OrderLogsRepo(OrderLogs);
    },
  },
];

@Module({
  controllers: [OrderLogsController],
  providers: [Logger, ...infrastructure, OrderLogsService],
})
export class OrderLogsModule {}
