import { Transform, Type } from "class-transformer";
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsLatitude,
  IsLongitude,
  IsBoolean,
  IsNumberString,
  IsObject,
} from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class CalculatedMealAddon {
  @IsNumberString()
  id: string;

  @IsNumberString()
  brand_id: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  quantity: number;
}

export class CalculatedOrderMeal {
  @IsNumberString()
  id: string;

  @IsNumberString()
  brand_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => CalculatedMealAddon)
  addons: CalculatedMealAddon[];
}

export class CreateCalculatedOrderDto {
  @IsBoolean()
  free_delivery: boolean;

  @IsObject()
  address_details: Record<string, any>;

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => CalculatedOrderMeal)
  meals: CalculatedOrderMeal[];

  @IsLatitude()
  lat: string;

  @IsLongitude()
  lng: string;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  user_id: bigint;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  cokitchen_polygon_id: bigint;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  cokitchen_id: bigint;

  @IsBoolean()
  pickup: boolean;

  @IsOptional()
  @IsNumberString()
  prev_price: string;
}
