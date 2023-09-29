import { Transform } from "class-transformer";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";

export class GetUserDto {
  @IsBigInt()
  @Transform((data: any) => {
    return BigInt(data.value);
  })
  id: bigint;
}
