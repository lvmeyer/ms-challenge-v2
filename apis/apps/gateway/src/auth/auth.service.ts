import { compare, hash } from 'bcryptjs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

import { AUTH_SERVICE } from '@app/common';
import { UsersService } from '../users/users.service';
import {
  LoginRequest,
  RegisterRequest,
} from '../../../../libs/common/src/dtos/auth/auth.request';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  public async login(
    loginRequest: LoginRequest,
  ): Promise<{ access_token: string; payload: any }> {
    const user = await this.usersService.getUserByEmail(loginRequest.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await compare(loginRequest.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return { access_token, payload };
  }

  public async register(registerRequest: RegisterRequest) {
    const user = await this.usersService.getUserByEmail(registerRequest.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await hash(registerRequest.password, saltRounds);
    const newUser = await this.usersService.createUser({
      email: registerRequest.email,
      password: hashedPassword,
      firstname: registerRequest.firstname,
      lastname: registerRequest.lastname,
    });

    this.authClient.emit('register-user', {
      email: registerRequest.email,
      firstname: registerRequest.firstname,
      lastname: registerRequest.lastname,
    });

    return newUser;
  }
}
