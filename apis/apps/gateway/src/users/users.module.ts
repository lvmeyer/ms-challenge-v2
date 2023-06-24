import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket, Category, Product, TypeOrmCustomModule } from '@app/common';
import { User } from './User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([User, Basket, Product, Category]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
