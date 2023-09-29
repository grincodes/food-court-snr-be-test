import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { IsBigInt } from "src/libs/common/decorators/custom-validators/isBigInt";
import { BaseAggregateRoot } from "src/libs/domain/BaseAggregateRoot";
import { UniqueEntityID } from "src/libs/domain/UniqueEntityID";
import { Guard } from "src/libs/domain/logic/Guard";
import { Result } from "src/libs/domain/logic/Result";

export interface OrderProps {
  user_id: bigint;
  calculated_order_id: bigint;
  order_type_id: bigint;
  paid: boolean;
  scheduled: boolean;

  rider_id?: bigint;
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
  confirmed_by_id?: bigint;
  completed_by_id?: bigint;
  scheduled_delivery_date?: string;
  scheduled_delivery_time?: string;
  is_hidden?: boolean;
}

export class OrderPropsValidation {
  @IsBigInt()
  user_id: bigint;

  @IsBigInt()
  calculated_order_id: bigint;

  @IsBigInt()
  order_type_id: bigint;

  @IsBoolean()
  paid: boolean;

  @IsBoolean()
  scheduled: boolean;
}

export class Order extends BaseAggregateRoot<OrderProps> {
  private constructor(props: OrderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): bigint {
    return this._id.toValue() as bigint;
  }

  get user_id(): bigint {
    return this.props.user_id;
  }

  get calculated_order_id(): bigint {
    return this.props.calculated_order_id;
  }
  get rider_id(): bigint {
    return this.props.rider_id;
  }

  get order_type_id(): bigint {
    return this.props.order_type_id;
  }

  get paid(): boolean {
    return this.props.paid;
  }

  get scheduled(): boolean {
    return this.props.scheduled;
  }

  get order_code(): string {
    return this.order_code;
  }

  set order_code(id: string) {
    this.props.order_code = "Fc-" + id;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get completed_time(): string {
    return this.props.completed_time;
  }

  get kitchen_prepared(): boolean {
    return this.props.kitchen_prepared;
  }

  get rider_assigned(): boolean {
    return this.props.rider_assigned;
  }

  get kitchen_completed_time(): string {
    return this.props.kitchen_completed_time;
  }

  get cancelled(): boolean {
    return this.props.cancelled;
  }

  get kitchen_cancelled(): boolean {
    return this.props.kitchen_cancelled;
  }

  get kitchen_accepted(): boolean {
    return this.props.kitchen_accepted;
  }

  get kitchen_dispatched(): boolean {
    return this.props.kitchen_dispatched;
  }

  get kitchen_dispatched_time(): string {
    return this.props.kitchen_dispatched_time;
  }

  get rider_started(): boolean {
    return this.props.rider_started;
  }

  get rider_arrived(): boolean {
    return this.props.rider_arrived;
  }

  get rider_started_time(): string {
    return this.props.rider_started_time;
  }

  get rider_arrived_time(): string {
    return this.props.rider_arrived_time;
  }

  get is_failed_trip(): boolean {
    return this.props.is_failed_trip;
  }

  get confirmed_by_id(): bigint {
    return this.props.confirmed_by_id;
  }

  get completed_by_id(): bigint {
    return this.props.completed_by_id;
  }

  get scheduled_delivery_date(): string {
    return this.props.scheduled_delivery_date;
  }

  get scheduled_delivery_time(): string {
    return this.props.scheduled_delivery_time;
  }

  get is_hidden(): boolean {
    return this.props.is_hidden;
  }

  public static create(props: OrderProps, id?: UniqueEntityID): Result<Order> {
    const guardResult = Guard.validate(OrderPropsValidation, props);

    if (guardResult) {
      return Result.fail<Order>(guardResult.errMsg);
    }

    const order = new Order(
      {
        ...props,
      },
      id
    );

    order.order_code = order.id.toString();

    return Result.ok<Order>(order);
  }
}
