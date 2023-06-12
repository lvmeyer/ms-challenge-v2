import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { BILLING_SERVICE } from '@app/common';
import { GatewayProductController } from './controllers/gateway-products.controller';
import { GatewayProductService } from './services/gateway-products.service';
import { GatewayBasketController } from './controllers/gateway-basket.controller';
import { GatewayBasketService } from './services/gateway-basket.service';
import { GatewayPingController } from './controllers/gateway-ping.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        PORT_PRODUCTS: Joi.string().required(),
        PORT_BASKET: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_BILLINGS_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }), // AUTH
  ],
  controllers: [
    GatewayProductController,
    GatewayBasketController,
    GatewayPingController,
  ],
  providers: [GatewayProductService, GatewayBasketService],
})
export class GatewayModule {}
