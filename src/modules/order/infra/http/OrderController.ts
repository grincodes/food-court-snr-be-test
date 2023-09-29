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
import { OrderService } from "../../application/OrderService";
import { CreateOrderDto } from "../../dto/CreateOrderDto";


@Controller("v1/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/")
  async getAllPaginatedOrders(@Query() data: any) {
    const res = await this.orderService.getAllPaginatedOrders(
      data.size,
      data.page
    );
    return res;
  }

  @Get("/:id")
  async getOrderById(@Param("id") id: string) {
    const res = await this.orderService.getOrderById(BigInt(id));
    return res;
  }

  @Post("/")
  async createOrder(@Body() dto: CreateOrderDto) {
    const res = await this.orderService.createOrder(dto);
    return res;
  }

  @Put("/:id")
  async patchOrder(
    @Param("id") id: string,
    @Body() dto: Partial<CreateOrderDto>
  ) {
    const res = await this.orderService.updateOrder(BigInt(id), dto);
    return res;
  }

  @Patch("/:id")
  async confirmOrder(
    @Param("id") id: string,
    @Body() dto: Partial<CreateOrderDto>
  ) {
    const res = await this.orderService.confirmOrder(BigInt(id), dto);
    return res;
  }

  @Delete("/:id")
  async deleteMeal(@Param("id") id: string) {
    const res = await this.orderService.deleteMeal(BigInt(id));
    return res;
  }
}
