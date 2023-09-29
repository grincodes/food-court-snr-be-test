import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @IsOptional()
  id;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles?: string[];
}
