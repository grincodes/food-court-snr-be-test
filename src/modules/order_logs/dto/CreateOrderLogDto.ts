import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class CreateOrderLogDto {
  @IsOptional()
  id;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  order_id: bigint;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  description: string;
}
