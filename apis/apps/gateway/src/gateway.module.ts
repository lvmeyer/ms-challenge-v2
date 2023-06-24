import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqModule } from '@app/common';
import { BILLING_SERVICE } from '@app/common';
import { GatewayProductController } from './controllers/gateway-products.controller';
import { GatewayProductService } from './services/gateway-products.service';
import { GatewayBasketController } from './controllers/gateway-basket.controller';
import { GatewayBasketService } from './services/gateway-basket.service';
import { GatewayPingController } from './controllers/gateway-ping.controller';
import { GatewayPingService } from './services/gateway-ping.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HOSTNAME_PRODUCTS: Joi.string().required(),
        HOSTNAME_BASKET: Joi.string().required(),
        //   RABBITMQ_URI: Joi.string().required(),
        //   RABBITMQ_BILLINGS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({ name: BILLING_SERVICE }), // AUTH
    UsersModule,
    AuthModule,
  ],
  controllers: [
    GatewayProductController,
    GatewayBasketController,
    GatewayPingController,
  ],
  providers: [GatewayProductService, GatewayBasketService, GatewayPingService],
  exports: [],
})
export class GatewayModule {}
