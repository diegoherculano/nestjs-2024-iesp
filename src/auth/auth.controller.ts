import { Body, Controller, Post } from '@nestjs/common';
import { AuthRequest, AuthResponse, AuthService } from './auth.service';

interface IAuthController {
  login(body: AuthRequest): AuthResponse;
  signup(body: AuthRequest): AuthResponse;
}

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  // TODO: Implement signup
  @Post('signup')
  signup(body: AuthRequest): AuthResponse {
    console.log({ body });
    throw new Error('Method not implemented.');
  }

  @Post('login')
  login(@Body() body: AuthRequest) {
    return this.authService.login(body);
  }
}
