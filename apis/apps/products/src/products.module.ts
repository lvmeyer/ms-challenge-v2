import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  BILLING_SERVICE,
  RmqModule,
  Product,
  Basket,
  TypeOrmCustonModule,
} from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    RmqModule.register({ name: BILLING_SERVICE }),
    TypeOrmCustonModule.register(),
    TypeOrmModule.forFeature([Product, Basket]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
