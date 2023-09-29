import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateOrderTypeDto {
  @IsOptional()
  id: bigint;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
