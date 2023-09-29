import { Type } from "class-transformer";
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";
import { Entity } from "src/libs/domain/Entity";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { Guard } from "src/libs/domain/logic/Guard";
import { Result } from "src/libs/domain/logic/Result";

export interface CalculatedOrderProps {
  total_amount?: string;
  free_delivery?: boolean;
  delivery_fee?: string;
  service_charge?: string;
  address_details: Record<string, any>;
  meals: Record<string, any>[];
  lat: string;
  lng: string;
  user_id: bigint;
  cokitchen_polygon_id: bigint;
  cokitchen_id: bigint;
  pickup: boolean;
  prev_price?: string;
}

export class CalculatedMealAddon {
  id: bigint;
  amount: number;
  quantity: number;
  brand_id: bigint;
}

export class CalculatedMealAddonValidation {
  // @IsBigInt()
  // id: bigint;

  // @IsBigInt()
  // brand_id: bigint;

  @IsNumber()
  amount: number;

  @IsNumber()
  quantity: number;
}

export class CalculatedOrderMeal {
  id: bigint;
  brand_id: bigint;
  quantity: number;
  amount: number;
  name: string;
  addons: CalculatedMealAddon[];
}

export class CalculatedOrderMealValidation {
  // @IsBigInt()
  // id: bigint;

  // @IsBigInt()
  // brand_id: bigint;

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
  @Type(() => CalculatedMealAddonValidation)
  addons: CalculatedMealAddonValidation[];
}

export class CalculatedOrderPropsValidation {
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => CalculatedOrderMealValidation)
  meals: CalculatedOrderMealValidation[];

  @IsLatitude()
  lat: string;

  @IsLongitude()
  lng: string;

  @IsBigInt()
  user_id: bigint;

  @IsBigInt()
  cokitchen_polygon_id: bigint;

  @IsBigInt()
  cokitchen_id: bigint;

  @IsBoolean()
  pickup: boolean;

  @IsOptional()
  @IsNumberString()
  prev_price: string;
}

export class CalculatedOrder extends Entity<CalculatedOrderProps> {
  private constructor(props: CalculatedOrderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): bigint {
    return this._id.toValue() as bigint;
  }

  get total_amount(): string {
    return this.props.total_amount;
  }

  get free_delivery(): boolean {
    return this.props.free_delivery;
  }

  get delivery_fee(): string {
    return this.props.delivery_fee;
  }
  get service_charge(): string {
    return this.props.service_charge;
  }

  get address_details(): Record<string, any> {
    return this.props.address_details;
  }

  get meals(): Record<string, any>[] {
    return this.props.meals;
  }

  get lat(): string {
    return this.props.lat;
  }

  get lng(): string {
    return this.props.lng;
  }

  get user_id(): bigint {
    return this.props.user_id;
  }

  get cokitcehn_polygon_id(): bigint {
    return this.props.cokitchen_polygon_id;
  }

  get cokitchen_id(): bigint {
    return this.props.cokitchen_id;
  }

  get pickup(): boolean {
    return this.props.pickup;
  }

  get prev_price(): string {
    return this.props.prev_price;
  }

  private static calculateTotalAmount(meals: CalculatedOrderMeal[]): number {
    let total_amt = 0;

    if (meals.length) {
      for (let i = 0; i < meals.length; i++) {
        if (meals[i].addons.length) {
          const totalAddonPrice = meals[i].addons.reduce(
            (accumulator, currentItem) => {
              const itemTotal = currentItem.amount * currentItem.quantity;
              return accumulator + itemTotal;
            },
            0
          );

          total_amt = total_amt + totalAddonPrice;
        }

        let meal_price = meals[i].quantity * meals[i].amount;

        total_amt = total_amt + meal_price;
      }
    }

    return total_amt;
  }

  private static calculateDeliveryFee(): number {
    //user random val instead of using polygon and lat lng

    const min = 500;
    const max = 1500;

    // Generate a random number between min and max (inclusive of min, exclusive of max)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  }

  private static calculateServiceCharge(deliveryFee: number): number {
    return Math.floor(deliveryFee * 0.01);
  }

  public static create(
    props: CalculatedOrderProps,
    id?: UniqueEntityID
  ): Result<CalculatedOrder> {
    const guardResult = Guard.validate(CalculatedOrderPropsValidation, props);

    if (guardResult) {
      return Result.fail<CalculatedOrder>(guardResult.errMsg);
    }

    const total_meal_amount = CalculatedOrder.calculateTotalAmount(
      props.meals as CalculatedOrderMeal[]
    );

    let deliveryFee =
      props?.free_delivery || props?.pickup
        ? 0
        : CalculatedOrder.calculateDeliveryFee();

    const serviceCharge = CalculatedOrder.calculateServiceCharge(deliveryFee);

    const final_total_amt = total_meal_amount + deliveryFee + serviceCharge;

    props.total_amount = final_total_amt.toString();
    props.service_charge = serviceCharge.toString();
    props.delivery_fee = deliveryFee.toString();
    props.prev_price = final_total_amt.toString();

    const calculatedOrder = new CalculatedOrder(
      {
        ...props,
      },
      id
    );

    return Result.ok<CalculatedOrder>(calculatedOrder);
  }
}
