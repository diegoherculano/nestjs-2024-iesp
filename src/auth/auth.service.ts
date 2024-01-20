import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
};

interface IAuthService {
  login(body: AuthRequest): AuthResponse;
  signup(body: AuthRequest): AuthResponse;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private jwtService: JwtService) {}

  login(body: AuthRequest): AuthResponse {
    return {
      access_token: this.jwtService.sign({ username: body.username }),
    };
  }
  signup(body: AuthRequest): AuthResponse {
    throw new Error('Method not implemented.');
  }
}
