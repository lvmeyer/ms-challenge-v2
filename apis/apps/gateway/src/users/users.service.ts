import { hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from '../../../../libs/common/src/dtos/users/users.request';
import { User } from './User';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


@Injectable()
export class UsersService {
  private readonly s3Client = new S3Client({ region: 'eu-west-3' });

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getMe(access_token: string): Promise<User> {
    const email = this.jwtService.verify(access_token, {
      secret: process.env.JWT_SECRET,
    }).email;

    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateProfile(
    access_token: string,
    updateProfileRequest: UpdateProfileRequest,
  ): Promise<any> {
    const user = await this.getMe(access_token);

    await this.usersRepository.update(user.id, {
      firstname: updateProfileRequest.firstname || user.firstname,
      lastname: updateProfileRequest.lastname || user.lastname,
    });

    return { message: 'Profile updated successfully' };
  }

  async updatePassword(
    access_token: string,
    updatePasswordRequest: UpdatePasswordRequest,
  ): Promise<any> {
    const user = await this.getMe(access_token);
    const NewPassword = await hash(updatePasswordRequest.password, 10);

    await this.usersRepository.update(user.id, {
      password: NewPassword,
    });

    return { message: 'Password updated successfully' };
  }

  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    try {
      return await this.usersRepository.save(createUserRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  public getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async getUserById(uuid: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: uuid });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(uuid: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: uuid });
    if (!user) {
      throw new NotFoundException('User not found for deletion');
    }

    await this.usersRepository.remove(user);
  }
  
  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nest-project-1',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
