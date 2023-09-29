import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseModule } from "./libs/db/DatabaseModule";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { BrandModule } from "./modules/brand/BrandModule";
import { OrderTypeModule } from "./modules/order_type/OrderTypeModule";
import { AddonModule } from "./modules/addon/AddonModule";
import { MealModule } from "./modules/meal/MealModule";
import { AuthModule } from "./modules/auth/auth.module";
import { CalculatedOrderModule } from "./modules/calculated_order/CalculatedOrderModule";
import { ConfirmPricingModule } from "./modules/confirm_pricing/ConfirmPricingModule";
import { OrderModule } from "./modules/order/OrderModule";
import { OrderLogsModule } from "./modules/order_logs/OrderLogsModule";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AuthModule,
    BrandModule,
    OrderTypeModule,
    AddonModule,
    MealModule,
    ConfirmPricingModule,
    CalculatedOrderModule,
    OrderModule,
    OrderLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
