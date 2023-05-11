import { Module } from '@nestjs/common';
import { GatewayOrderController } from './controllers/gateway-orders.controller';
import { GatewayOrderService } from './services/gateway-orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { BILLING_SERVICE } from '@app/common';
import { GatewayProductController } from './controllers/gateway-products.controller';
import { GatewayProductService } from './services/gateway-products.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        PORT_ORDERS: Joi.string().required(),
        PORT_PRODUCTS: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
  ],
  controllers: [GatewayOrderController, GatewayProductController],
  providers: [GatewayOrderService, GatewayProductService],
})
export class GatewayModule {}
