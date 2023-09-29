import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ConfirmPricingService } from "./ConfirmPricingService";

@Controller("v1/pricing")
export class ConfirmPricingController {
  constructor(private readonly confirmPricingService: ConfirmPricingService) {}

  @Post("/")
  async validatePricing(@Body() dto) {
    const res = await this.confirmPricingService.validatePriceFromPayload(dto.meals)
    return res;
  }
}
