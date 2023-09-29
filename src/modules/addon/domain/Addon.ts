import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";
import { Entity } from "src/libs/domain/Entity";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { Result } from "src/libs/domain/logic/Result";
import { Guard } from "src/libs/domain/logic/Guard";

export interface AddonProps {
  name: string;
  brand_id: bigint;
  active?: boolean;
  amount: number;
  min_selection_no: number;
  internal_profit?: number;
  item_type: string;
  meal_category_id: bigint;
}

export class AddonPropsValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBigInt()
  brand_id: bigint;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsNumber()
  amount: number;

  @IsNumber()
  min_selection_no: number;

  @IsString()
  @IsNotEmpty()
  item_type: string;

  @IsBigInt()
  meal_category_id: bigint;
}

export class Addon extends Entity<AddonProps> {
  private constructor(props: AddonProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): bigint {
    return this._id.toValue() as bigint;
  }

  get name(): string {
    return this.props.name;
  }

  get brand_id(): bigint {
    return this.props.brand_id;
  }

  get active(): boolean {
    return this.props.active;
  }

  get amount(): number {
    return this.props.amount;
  }

  get min_selection_no(): number {
    return this.props.min_selection_no;
  }

  get internal_profit(): number {
    return this.props.internal_profit;
  }

  get item_type(): string {
    return this.props.item_type;
  }

  get meal_category_id(): bigint {
    return this.props.meal_category_id;
  }

  public static create(props: AddonProps, id?: UniqueEntityID): Result<Addon> {
    const guardResult = Guard.validate(AddonPropsValidation, props);

    if (guardResult) {
      return Result.fail<Addon>(guardResult.errMsg);
    }

    const addOn = new Addon(
      {
        ...props,
      },
      id
    );

    return Result.ok<Addon>(addOn);
  }
}
