import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class CreateOrderDto {
  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  user_id: bigint;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  calculated_order_id: bigint;

  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  order_type_id: bigint;

  @IsBoolean()
  paid: boolean;

  @IsBoolean()
  scheduled: boolean;

  @IsOptional()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  rider_id?: bigint;

  @IsOptional()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  confirmed_by_id?: bigint;

  @IsOptional()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  completed_by_id?: bigint;

  order_code?: string;
  completed?: boolean;
  completed_time?: string;
  kitchen_prepared?: boolean;
  rider_assigned?: boolean;
  kitchen_verified_time?: string;
  kitchen_completed_time?: string;
  cancelled?: boolean;
  kitchen_cancelled?: boolean;
  kitchen_accepted?: boolean;
  kitchen_dispatched?: boolean;
  kitchen_dispatched_time?: string;

  is_failed_trip?: boolean;
  rider_started_time?: string;
  rider_started?: boolean;
  rider_arrived_time?: string;
  rider_arrived?: boolean;
  scheduled_delivery_date?: string;
  scheduled_delivery_time?: string;
  is_hidden?: boolean;
}
