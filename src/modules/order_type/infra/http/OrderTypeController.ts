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
import { OrderTypeService } from "../../application/OrderTypeService";
import { CreateOrderTypeDto } from "../../dto/CreateOrderTypeDto";

@Controller("v1/order-type")
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

  @Get("/")
  async getAllPaginated(@Query() data: any) {
    const res = await this.orderTypeService.getAllPaginatedOrderTypes(
      data.size,
      data.page
    );
    return res;
  }

  @Get("/:id")
  async getOrderType(@Param("id") id: string) {
    const res = await this.orderTypeService.getOrderTypeById(BigInt(id));
    return res;
  }

  @Post("/")
  async createOrderType(@Body() dto: CreateOrderTypeDto) {
    const res = await this.orderTypeService.createOrderType(dto);
    return res;
  }

  @Put("/:id")
  async patchOrderType(
    @Param("id") id: string,
    @Body() dto: Partial<CreateOrderTypeDto>
  ) {
    const res = await this.orderTypeService.updateOrderType(BigInt(id), dto);
    return res;
  }

  @Delete("/:id")
  async deleteOrderType(@Param("id") id: string) {
    const res = await this.orderTypeService.deleteOrderType(BigInt(id));
    return res;
  }
}
