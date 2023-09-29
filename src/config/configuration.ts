import { Logger } from "@nestjs/common";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

import dotenv = require("dotenv");
dotenv.config();

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsBoolean()
  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === "true";

  @IsString()
  readonly DATABASE_HOST = process.env.DATABASE_HOST as string;

  @IsInt()
  readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

  @IsString()
  readonly DATABASE_NAME = process.env.DATABASE_NAME as string;

  @IsString()
  readonly DATABASE_USER = process.env.DATABASE_USER as string;

  @IsString()
  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

  @IsString()
  readonly SLACK_TOKEN = process.env.SLACK_TOKEN as string;

  @IsNumber()
  readonly JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);

  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET as string;

  @IsBoolean()
  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === "true";

  @IsInt()
  readonly PORT = Number(process.env.PORT);

  constructor() {
    const error = validateSync(this);

    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error[0])}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
