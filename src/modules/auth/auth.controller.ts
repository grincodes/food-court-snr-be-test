import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "src/libs/common/guards/local-auth.guard";
import { CurrentUser } from "src/libs/common/decorators/current-user.decorator";
import { Users } from "./users/entity/UsersEntity";
import { JwtAuthGuard } from "src/libs/common/guards/jwt-auth.guard";
import { LoginDto } from "./dto/login.dto";

@Controller("v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @CurrentUser() user: Partial<Users>,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
   
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
    };
  }
}
