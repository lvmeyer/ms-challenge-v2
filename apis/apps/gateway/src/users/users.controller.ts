import { Request } from 'express';
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
  ValidationPipe,
  Req,
  BadRequestException,
  Headers,
  Post,
} from '@nestjs/common';

import { UpdateProfileRequest, UpdatePasswordRequest } from '@app/common';
import { User } from './User';
import { Role } from '../auth/auth.enum';
import { AuthRequired, HasRole } from '../auth/auth.decorator';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }

  @Get('me')
  @AuthRequired()
  getMe(@Headers() headers: any) {
    const access_token = headers.authorization.split(' ')[1];

    try {
      return this.usersService.getMe(access_token);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch('/updateprofile')
  @AuthRequired()
  updateProfile(
    @Req() req: Request,
    @Body(ValidationPipe) updateProfileRequest: Partial<UpdateProfileRequest>,
    @Headers() headers: any,
  ) {
    const access_token = headers.authorization.split(' ')[1];

    return this.usersService.updateProfile(access_token, updateProfileRequest);
  }

  @Patch('/updatepassword')
  @AuthRequired()
  updatePassword(
    @Req() req: Request,
    @Body(ValidationPipe) updatePasswordRequest: UpdatePasswordRequest,
    @Headers() headers: any,
  ) {
    const access_token = headers.authorization.split(' ')[1];

    return this.usersService.updatePassword(
      access_token,
      updatePasswordRequest,
    );
  }

  @Get()
  @HasRole(Role.ADMINISTRATOR)
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':uuid')
  @HasRole(Role.ADMINISTRATOR)
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return this.usersService.getUserById(uuid);
  }

  @Delete(':uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.usersService.delete(uuid);
  }

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed(): Promise<void> {
    return await this.usersService.seed();
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async createUser(
  //   @Body(ValidationPipe) createUserRequest: CreateUserRequest,
  // ): Promise<User> {
  //   return await this.usersService.createUser(createUserRequest);
  // }
}