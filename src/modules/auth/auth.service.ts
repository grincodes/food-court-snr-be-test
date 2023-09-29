import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { Users } from './users/entity/UsersEntity';
import { Config } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(user: Partial<Users>, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + Config.JWT_EXPIRATION,
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
