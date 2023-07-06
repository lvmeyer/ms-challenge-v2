import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RmqModule, TypeOrmCustomModule, PAYMENT_SERVICE } from '@app/common';
import { GatewayProductController } from './controllers/gateway-products.controller';
import { GatewayProductService } from './services/gateway-products.service';
import { GatewayBasketController } from './controllers/gateway-basket.controller';
import { GatewayBasketService } from './services/gateway-basket.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GatewayPaymentController } from './controllers/gateway-payment.controller';
import { GatewayPaymentService } from './services/gateway-payment.service';
import { User } from './users/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HOSTNAME_PRODUCTS: Joi.string().required(),
        HOSTNAME_BASKET: Joi.string().required(),
        HOSTNAME_PAYMENT: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
    RmqModule.register({ name: PAYMENT_SERVICE }),
    UsersModule,
    AuthModule,
  ],
  controllers: [
    GatewayProductController,
    GatewayBasketController,
    GatewayPaymentController,
  ],
  providers: [
    GatewayProductService,
    GatewayBasketService,
    GatewayPaymentService,
  ],
  exports: [],
})
export class GatewayModule {}
