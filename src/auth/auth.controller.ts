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
  signup(@Body() body: AuthRequest): AuthResponse {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: AuthRequest) {
    return this.authService.login(body);
  }
}
