import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
  Req,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdateUserRequest,
  UpdatePasswordRequest,
} from './dto/users.request';
// import {
//   AuthRequired,
//   HasRole,
// } from '../auth/auth.decorator';
import { Request } from 'express';
import { Role } from '../auth/auth.enum';
import { User } from './User';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }

  // @Get('me')
  // // @AuthRequired()
  // getMe(@Headers() headers: any) {
  //   const access_token = headers.authorization.split(' ')[1];

  //   try {
  //     return this.usersService.getMe(access_token);
  //   } catch (err) {
  //     throw new BadRequestException(err.message);
  //   }
  // }

  // @Patch('/updateemail')
  // // @AuthRequired()
  // updateProfile(
  //   @Req() req: Request,
  //   @Body(ValidationPipe) updateProfileRequest: UpdateProfileRequest,
  //   @Headers() headers: any,
  // ) {
  //   const access_token = headers.authorization.split(' ')[1];

  //   return this.usersService.updateProfile(access_token, updateProfileRequest);
  // }

  // @Patch('/updatepassword')
  // // @AuthRequired()
  // updatePassword(
  //   @Req() req: Request,
  //   @Body(ValidationPipe) updatePasswordRequest: UpdatePasswordRequest,
  //   @Headers() headers: any,
  // ) {
  //   const access_token = headers.authorization.split(' ')[1];

  //   return this.usersService.updatePassword(
  //     access_token,
  //     updatePasswordRequest,
  //   );
  // }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async createUser(
  //   @Body(ValidationPipe) createUserRequest: CreateUserRequest,
  // ): Promise<User> {
  //   return await this.usersService.createUser(createUserRequest);
  // }

  // // @AuthRequired()
  // // @HasRole(Role.ADMINISTRATOR)
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // public getUsers() {
  //   return this.usersService.getUsers();
  // }

  // @Get(':uuid')
  // // @AuthRequired()
  // @HttpCode(HttpStatus.OK)
  // async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
  //   return this.usersService.getUserById(uuid);
  // }

  // @Get(':uuid/competences')
  // @HttpCode(HttpStatus.OK)
  // async findUserCompetences(
  //   @Param('uuid', ParseUUIDPipe) uuid: string,
  // ): Promise<User> {
  //   return this.usersService.findUserCompetences(uuid);
  // }

  // @Get(':uuid/badges')
  // @HttpCode(HttpStatus.OK)
  // async findUserBadges(
  //   @Param('uuid', ParseUUIDPipe) uuid: string,
  // ): Promise<User> {
  //   return this.usersService.findUserBadges(uuid);
  // }

  // @Patch(':uuid')
  // // @AuthRequired()
  // // @HasRole(Role.ADMINISTRATOR)
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('uuid', ParseUUIDPipe) uuid: string,
  //   @Body(ValidationPipe) updateUserRequest: UpdateUserRequest,
  // ): Promise<any> {
  //   return await this.usersService.update(uuid, updateUserRequest);
  // }

  // @Delete(':uuid')
  // // @AuthRequired()
  // // @HasRole(Role.ADMINISTRATOR)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
  //   return await this.usersService.delete(uuid);
  // }
}
