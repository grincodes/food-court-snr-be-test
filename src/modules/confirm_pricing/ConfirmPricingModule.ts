import { Module } from "@nestjs/common";
import { ConfirmPricingService } from "./ConfirmPricingService";
import { MealModule } from "../meal/MealModule";
import { AddonModule } from "../addon/AddonModule";
import { ConfirmPricingController } from "./ConfirmPricingController";

@Module({
  imports: [MealModule, AddonModule],
  controllers: [ConfirmPricingController],
  providers: [ConfirmPricingService],
  exports: [ConfirmPricingService],
})
export class ConfirmPricingModule {}
