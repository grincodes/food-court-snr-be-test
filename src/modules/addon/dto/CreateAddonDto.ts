import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  brand_id: bigint;

  @IsNumber()
  amount: number;

  @IsNumber()
  min_selection_no: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  item_type: string;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  meal_category_id: bigint;
}
