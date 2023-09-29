import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CalculatedOrderService } from "../../application/CalculatedOrderService";
import { CreateCalculatedOrderDto } from "../../dto/CreateCalculatedOrderDto";

@Controller("v1/calculated-order")
export class CalculatedOrderController {
  constructor(
    private readonly calculatedOrderService: CalculatedOrderService
  ) {}

  @Get("/")
  async getAllPaginatedCalculatedOrders(@Query() data: any) {
    const res =
      await this.calculatedOrderService.getAllPaginatedCalculatedOrders(
        data.size,
        data.page
      );
    return res;
  }

  @Get("/:id")
  async getCalculatedOrderById(@Param("id") id: string) {
    const res = await this.calculatedOrderService.getCalculatedOrderById(
      BigInt(id)
    );
    return res;
  }

  @Post("/calculate")
  async calculateOrder(@Body() dto: CreateCalculatedOrderDto) {
    const res = await this.calculatedOrderService.calculateOrder(dto);
    return res;
  }

  @Put("/:id")
  async patchMeal(
    @Param("id") id: string,
    @Body() dto: Partial<CreateCalculatedOrderDto>
  ) {
    const res = await this.calculatedOrderService.updateCalculatedOrder(
      BigInt(id),
      dto
    );
    return res;
  }

  @Delete("/:id")
  async deleteMeal(@Param("id") id: string) {
    const res = await this.calculatedOrderService.deleteCalculatedOrder(
      BigInt(id)
    );
    return res;
  }
}
