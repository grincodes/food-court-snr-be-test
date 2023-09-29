import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "src/modules/auth/users/entity/UsersEntity";


const getCurrentUserByContext = (context: ExecutionContext): Partial<Users> => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context)
);
