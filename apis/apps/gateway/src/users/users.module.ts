import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCustomModule } from '@app/common';
import { UsersController } from './users.controller';
import { User } from './User';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmCustomModule.register(), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
