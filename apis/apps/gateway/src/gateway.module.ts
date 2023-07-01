import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqModule } from '@app/common';
import { PAYMENT_SERVICE } from '@app/common';
import { GatewayProductController } from './controllers/gateway-products.controller';
import { GatewayProductService } from './services/gateway-products.service';
import { GatewayBasketController } from './controllers/gateway-basket.controller';
import { GatewayBasketService } from './services/gateway-basket.service';
import { GatewayPingController } from './controllers/gateway-ping.controller';
import { GatewayPingService } from './services/gateway-ping.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GatewayPaymentController } from './controllers/gateway-payment.controller';
import { GatewayPaymentService } from './services/gateway-payment.service';

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
    RmqModule.register({ name: PAYMENT_SERVICE }),
    UsersModule,
    AuthModule,
  ],
  controllers: [
    GatewayProductController,
    GatewayBasketController,
    GatewayPingController,
    GatewayPaymentController,
  ],
  providers: [
    GatewayProductService,
    GatewayBasketService,
    GatewayPingService,
    GatewayPaymentService,
  ],
  exports: [],
})
export class GatewayModule {}
