import { Transform } from "class-transformer";
import { IsArray } from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class TestGetPricesDto {
  //   @IsBigInt()
  //   @Transform((data: any) => {
  //     return BigInt(data.value);
  //   })
  //   brand_id: bigint;

  @IsArray()
  @Transform((data: any) => {
    if (Array.isArray(data.value)) {
      // Transform each element of the array to BigInt
      return data.value.map((item: string) => BigInt(item));
    }
    return data.value; // Return as is if not an array
  })
  ids: bigint[];
}