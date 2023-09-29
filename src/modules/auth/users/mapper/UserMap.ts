import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { Users } from "../entity/UsersEntity";

export class UserMap {
  public static toPersistence(dto: CreateUserDto): Partial<Users> {
    return {
      id: new UniqueEntityID().toValue() as bigint,
      email: dto.email,
      password: bcrypt.hashSync(dto.password, 10),
      roles: dto?.roles ? `{${dto?.roles?.join(",")}}` : `{${[].join(",")}}`,
    };
  }
}
