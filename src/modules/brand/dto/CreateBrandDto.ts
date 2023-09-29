import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBrandDto {
  @IsOptional()
  id;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
