import { Logger, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { InjectionToken } from "./injectionToken";
import { UsersRepo } from "./users.repository";
import { Users } from "./entity/UsersEntity";

const infrastructure = [
  {
    provide: InjectionToken.USER_REPO,
    useFactory: () => {
      return new UsersRepo(Users);
    },
  },
];

@Module({
  controllers: [UsersController],
  providers: [Logger, ...infrastructure, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
