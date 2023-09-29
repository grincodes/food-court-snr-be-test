import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/libs/common/guards/jwt-auth.guard";
import { Users } from "./entity/UsersEntity";
import { CurrentUser } from "src/libs/common/decorators/current-user.decorator";

@Controller("v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("/")
  async getAllPaginatedBrands(@Query() data: any) {
    const res = await this.usersService.getPaginatedUsers(data.size, data.page);
    return res;
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: Partial<Users>) {
    return user;
  }
}
