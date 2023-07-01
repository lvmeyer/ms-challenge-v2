import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Basket, Category, Product, TypeOrmCustomModule } from '@app/common';
import { User } from './User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmCustomModule.register(),
    TypeOrmModule.forFeature([User, Basket, Product, Category]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
  ],

  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
