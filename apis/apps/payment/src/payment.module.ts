import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BILLING_SERVICE,
  Basket,
  Category,
  Product,
  RmqModule,
  TypeOrmCustomModule,
} from '@app/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT_BASKET: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_BILLINGS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Basket, Product, Category]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
