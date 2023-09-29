import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, MinLength, IsBoolean, IsNumber, IsArray, IsOptional } from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsBoolean()
  new?: boolean;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  brand_id: bigint;

  @IsBoolean()
  active?: boolean;

  @IsNumber()
  amount: number;


  @IsArray()
  images: string[];

  @IsOptional()
  @IsArray()
  meal_keywords: string[];

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  meal_category_id: bigint;
}