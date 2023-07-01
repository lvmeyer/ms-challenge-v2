import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AUTH_SERVICE, RmqModule } from '@app/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_AUTH_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({ name: AUTH_SERVICE }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
