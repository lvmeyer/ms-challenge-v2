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
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';

import { UpdateProfileRequest, UpdatePasswordRequest, UpdateEmailRequest } from '@app/common';
import { User } from './User';
import { Role } from '../auth/auth.enum';
import { AuthRequired, HasRole } from '../auth/auth.decorator';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users/me')
  @AuthRequired()
  async getMe(@Headers() headers: any) {
    const access_token = headers.authorization.split(' ')[1];

    try {
      return await this.usersService.getMe(access_token);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('user-basket')
  @AuthRequired()
  async getUserBasketId(@Headers() headers: any) {
    const access_token = headers.authorization.split(' ')[1];

    try {
      return await this.usersService.getUserBasketId(access_token);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch('users/updateprofile')
  @AuthRequired()
  updateProfile(
    @Req() req: Request,
    @Body(ValidationPipe) updateProfileRequest: Partial<UpdateProfileRequest>,
    @Headers() headers: any,
  ) {
    const access_token = headers.authorization.split(' ')[1];
    console.log('SUCCESS profile: SERVICE');
    return this.usersService.updateProfile(access_token, updateProfileRequest);
  }

  @Patch('users/update-email')
  @AuthRequired()
  updateEmail(
    @Req() req: Request,
    @Body(ValidationPipe) updateEmailRequest: UpdateEmailRequest,
    @Headers() headers: any,
  ) {
    const access_token = headers.authorization.split(' ')[1];
    console.log('SUCCESS email: CONTROLLER');


    return this.usersService.updateEmail(access_token, updateEmailRequest);
  }

  @Patch('users/updatepassword')
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

  @Patch('reset-password')
  async resetPassword(@Body() { email }: { email: string }) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(email);

    const resetToken = this.usersService.generateRandomToken(32);

    await this.usersService.updateResetToken(user.id, resetToken);

    try {
      // await this.sendResetEmail(email, resetToken);
      return { resetToken: resetToken };
    } catch (error) {
      console.error('Error sending reset email:', error);
      throw new Error('Failed to send reset email.');
    }
  }
  
  @Patch('reset-password-form/:resetToken')
  async resetPasswordForm(
    @Param('resetToken') resetToken: string,
    @Body() { password }: { password: string }
  ) {
    const user = await this.usersService.getUserByResetToken(resetToken);

    // throw new NotFoundException(user);
    if (!user) {

      throw new NotFoundException('Invalid reset token');
    }

    await this.usersService.resetPassword(user.resetToken, password);

    return { message: 'Password reset successfully' };
  }



  @Get('users')
  @HasRole(Role.ADMINISTRATOR)
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get('users/:uuid')
  @HasRole(Role.ADMINISTRATOR)
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return this.usersService.getUserById(uuid);
  }

  @Delete('users/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.usersService.delete(uuid);
  }

  @Post('upload')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100_000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.usersService.upload(file.originalname, file.buffer);
  }
}
