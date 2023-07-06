import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Basket,
  Category,
  Product,
  Review,
  TypeOrmCustomModule,
} from '@app/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SubCategory } from '@app/common/entity/SubCategory';
import { ProductSubCategory } from '@app/common/entity/ProductSubCategory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Basket, Product, Category, SubCategory, Review, ProductSubCategory]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
