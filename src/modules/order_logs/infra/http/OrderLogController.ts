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
import { OrderLogsService } from "../../application/OrderLogsService";
import { CreateOrderLogDto } from "../../dto/CreateOrderLogDto";

@Controller("v1/order-log")
export class OrderLogsController {
  constructor(private readonly orderLogsService: OrderLogsService) {}

  @Get("/")
  async getAllPaginatedOrderLogs(@Query() data: any) {
    const res = await this.orderLogsService.getAllPaginatedOrderLogs(
      data.size,
      data.page
    );
    return res;
  }

  @Post("/")
  async createOrderLog(@Body() dto: CreateOrderLogDto) {
    const res = await this.orderLogsService.createOrderLog(dto);
    return res;
  }
}
