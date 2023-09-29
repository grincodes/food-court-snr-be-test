import { v4 as uuid } from "uuid";
import { Identifier } from "./Identifier";
import { Snowflake } from "nodejs-snowflake";

export class UniqueEntityID extends Identifier<string | number | bigint> {
  constructor(id?: string | number | bigint) {
    const _uid = new Snowflake();
    super(id ? id : _uid.idFromTimestamp(Date.now()).valueOf());
  }
}
