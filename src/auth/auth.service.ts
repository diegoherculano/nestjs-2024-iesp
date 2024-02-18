import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthRequest {
  @IsEmail()
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}

export type User = {
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
  users: User[] = [
    {
      username: 'test@gmail.com',
      password: '123456',
    },
  ];

  constructor(private jwtService: JwtService) {}

  login(body: AuthRequest): AuthResponse {
    const user = this.users.find(
      (user) =>
        user.username === body.username && user.password === body.password,
    );

    if (!user) {
      throw new HttpException('User or Password incorrect', 404);
    }

    return {
      access_token: this.jwtService.sign({ username: body.username }),
    };
  }

  signup(body: AuthRequest): AuthResponse {
    this.users.push(body);

    return {
      access_token: this.jwtService.sign({ username: body.username }),
    };
  }
}
