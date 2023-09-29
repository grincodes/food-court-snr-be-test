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

export interface MealProps {
  name: string;
  new?: boolean;
  brand_id: bigint;
  active?: boolean;
  amount: number;
  images: string[];
  meal_category_id: bigint;
  meal_keywords?: string[];
  description: string;
}

export class MealPropsValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  new: boolean;

  @IsBigInt()
  brand_id: bigint;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsNumber()
  amount: number;

  @IsArray()
  images: string[];

  @IsBigInt()
  meal_category_id: bigint;

  @IsOptional()
  @IsArray()
  meal_keywords: string[];

  @IsString()
  description: string;
}

export class Meal extends Entity<MealProps> {
  private constructor(props: MealProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): bigint {
    return this._id.toValue() as bigint;
  }

  get name(): string {
    return this.props.name;
  }

  get new(): boolean {
    return this.props.new;
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

  get images(): string | string[] {
    // Format the 'images' array as a PostgreSQL array string
    const formattedImages = `{${this.props.images.join(",")}}`;
    return formattedImages;
  }

  get meal_category_id(): bigint {
    return this.props.meal_category_id;
  }

  get meal_keywords(): string | string[] {
    const formattedKeyWords = `{${this.props.meal_keywords.join(",")}}`;
    return formattedKeyWords;
  }

  get description(): string {
    return this.props.description;
  }

  public static create(props: MealProps, id?: UniqueEntityID): Result<Meal> {
    const guardResult = Guard.validate(MealPropsValidation, props);

    if (guardResult) {
      return Result.fail<Meal>(guardResult.errMsg);
    }

    const meal = new Meal(
      {
        ...props,
      },
      id
    );

    return Result.ok<Meal>(meal);
  }
}
