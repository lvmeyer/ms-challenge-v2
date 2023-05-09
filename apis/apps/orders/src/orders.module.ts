import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
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
      }),
      envFilePath: './apps/orders/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
