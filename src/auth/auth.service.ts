import { Injectable } from '@nestjs/common';
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
  users: User[];

  constructor(private jwtService: JwtService) {}

  login(body: AuthRequest): AuthResponse {
    // TODO
    // Verificar se o usuário existe
    return {
      access_token: this.jwtService.sign({ username: body.username }),
    };
  }

  // TODO: Implement signup
  // Salvar no objeto local users
  // Retornar token
  signup(body: AuthRequest): AuthResponse {
    throw new Error('Method not implemented.');
  }
}
