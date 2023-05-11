import { Module } from '@nestjs/common';
import { GatewayOrderController } from './controllers/gateway-orders.controller';
import { GatewayOrderService } from './services/gateway-orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        PORT_ORDERS: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
  ],
  controllers: [GatewayOrderController],
  providers: [GatewayOrderService],
})
export class GatewayModule {}
