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
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { Basket } from '@app/common';
import {
  CreateUserRequest,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  UpdateEmailRequest,
} from '../../../../libs/common/src/dtos/users/users.request';
import { User } from './User';
import { Role } from '../auth/auth.enum';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly s3Client = new S3Client({ region: 'eu-west-3' });

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
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

  async getUserBasketId(access_token: string): Promise<any> {
    const user = await this.getMe(access_token);

    const userData = await this.usersRepository.find({
      where: {
        id: user.id,
      },
      relations: {
        basket: true,
      },
    });

    if (!userData) {
      throw new BadRequestException('Basket not found for this user');
    }

    return { userId: user.id, basketId: userData[0].basket.id };
  }

  async updateProfile(
    access_token: string,
    updateProfileRequest: UpdateProfileRequest,
  ): Promise<{ message: string }> {
    const user = await this.getMe(access_token);

    await this.usersRepository.update(user.id, {
      firstname: updateProfileRequest.firstname || user.firstname,
      lastname: updateProfileRequest.lastname || user.lastname,
  });
  console.log('SUCCESS profile: SERVICE');

    return { message: 'Profile updated successfully' };
  }

  async updateEmail(
    access_token: string,
    updateEmailRequest: UpdateEmailRequest,
  ): Promise<{ message: string }> {
    const user = await this.getMe(access_token);

    await this.usersRepository.update(user.id, {
      email: updateEmailRequest.email || user.email,
    });

    console.log('SUCCESS email: SERVICE');
    return { message: 'Email updated successfully' };
  }

  async updatePassword(
    access_token: string,
    updatePasswordRequest: UpdatePasswordRequest,
    ): Promise<{ message: string }> {
      const user = await this.getMe(access_token);
      const NewPassword = await hash(updatePasswordRequest.password, 10);

    await this.usersRepository.update(user.id, {
      password: NewPassword,
    });

    return { message: 'Password updated successfully' };
  }


  // RESET PASSWORD

  async resetPassword(resetToken: string, newPassword: string) {
    const user = await this.getUserByResetToken(resetToken);
    if (!user) {
      throw new NotFoundException('reset password broken');
    }

    user.password = await this.hashPassword(newPassword);

    user.resetToken = null;
    await this.usersRepository.save(user);
  }




  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);

    return hashedPassword;
  }



  async emailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }


  async updateResetToken(uuid: string, resetToken: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: uuid });
    if (user) {
      user.resetToken = resetToken;
      await this.usersRepository.save(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }


  generateRandomToken(length: number): string {
    const token = crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
    return token.substr(0, length);
  }

  
  async sendPasswordResetEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  async getUserByResetToken(resetToken: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { resetToken } });
  
    if (!user) {
      return null;
    }
  
    return user;
  }



  // -----------------------------

  


  async createUser(createUserRequest: CreateUserRequest): Promise<User> {
    try {
      const basket = new Basket();
      basket.price = 0;
      await this.basketRepository.save(basket);

      const newUser = new User();
      newUser.email = createUserRequest.email;
      newUser.password = createUserRequest.password;
      newUser.firstname = createUserRequest.firstname;
      newUser.lastname = createUserRequest.lastname;
      newUser.role = Role.USER;

      newUser.basket = basket;

      return await this.usersRepository.save(newUser);
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

  async delete(uuid: string): Promise<void> {
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
