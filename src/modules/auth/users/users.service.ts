import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { UsersRepo } from "./users.repository";
import { InjectionToken } from "./injectionToken";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { UserMap } from "./mapper/UserMap";

@Injectable()
export class UsersService {
  @Inject(InjectionToken.USER_REPO)
  private readonly usersRepository: UsersRepo;

  async create(createUserDto: CreateUserDto) {
    const data = UserMap.toPersistence(createUserDto);

    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.save(data);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      const res = await this.usersRepository.exists({
        email: createUserDto.email,
      });
      if (res) {
        throw new UnprocessableEntityException("Email already exists.");
      }

      return;
    } catch (err) {
      return;
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException("Credentials are not valid.");
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  async getPaginatedUsers(pageSize: number, currentPage: number) {
    return this.usersRepository.findPaginated(pageSize, currentPage);
  }
}
