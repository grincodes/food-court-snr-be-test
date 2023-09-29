// logger.middleware.ts

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log the request information
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
    const requestBody = JSON.stringify(req.body);

    console.log(
      `[${timestamp}] ${method} ${url} - Request Body: ${requestBody}`
    );

    next();
  }
}
