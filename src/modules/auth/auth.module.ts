import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStategy } from "src/modules/auth/strategies/local.strategy";
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategy";
import { Config } from "src/config";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: Config.JWT_SECRET,
        signOptions: {
          expiresIn: `${Config.JWT_EXPIRATION}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy, JwtStrategy],
})
export class AuthModule {}
