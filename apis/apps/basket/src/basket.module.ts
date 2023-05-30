import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  BILLING_SERVICE,
  RmqModule,
  Basket,
  Product,
  TypeOrmCustomModule,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_BILLINGS_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Basket, Product]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
