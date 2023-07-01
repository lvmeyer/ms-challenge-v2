import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BILLING_SERVICE,
  RmqModule,
  Basket,
  Product,
  TypeOrmCustomModule,
  Category,
} from '@app/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

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
      // envFilePath: './apps/products/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Basket, Product, Category]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
