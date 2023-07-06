import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, Basket, TypeOrmCustomModule, Review } from '@app/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Category } from '@app/common/entity/Category';

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
    TypeOrmModule.forFeature([Product, Basket, Category, Review]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
// check cd
