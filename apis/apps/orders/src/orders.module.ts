import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { RmqModule, TypeOrmCustomModule } from '@app/common';
import { BILLING_SERVICE, Order } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
