import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Product, Basket, TypeOrmCustomModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // PORT: Joi.number().required(),
      }),
      envFilePath: './apps/products/.env',
    }),
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([Product, Basket]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
