import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from './dto/auth.request';

@Controller('api/v1/auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    const response = await this.authService.login(loginRequest);

    return {
      id: response.payload.id,
      email: response.payload.email,
      role: response.payload.role,
      access_token: response.access_token,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body(ValidationPipe) registerRequest: RegisterRequest) {
    return this.authService.register(registerRequest);
  }

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }
}
