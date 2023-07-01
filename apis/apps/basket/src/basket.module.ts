import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket, Product, TypeOrmCustomModule, Category } from '@app/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Basket, Product, Category]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
