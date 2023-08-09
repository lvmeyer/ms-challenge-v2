import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { PAYMENT_SERVICE, ErrorResponse } from '@app/common';
import { Repository } from 'typeorm';
import { User } from '../users/User';

@Injectable()
export class GatewayPaymentService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(PAYMENT_SERVICE) private paymentClient: ClientProxy,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  PATH = this.configService.get<string>('HOSTNAME_PAYMENT') + '/pv/payment';
  PATH_BASKET = this.configService.get<string>('HOSTNAME_BASKET') + '/pv/basket';

  async pay(access_token: string, price: number): Promise<any> {
    console.debug('POST', this.PATH);
    try {
      const response = await fetch(this.PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: price
        }),
      });
      const res = await response.json();

      if (response.status !== HttpStatus.CREATED) {
        throw new ErrorResponse(res.message, response.status);
      }

      const userInfos = this.jwtService.verify(access_token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersRepository.findOne({
        where: {
          id: userInfos.id,
        },
        relations: {
          basket: true,
        },
      });

      this.paymentClient.emit('create-billing', {
        email: userInfos.email,
        price: user.basket.price,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw new ErrorResponse(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeBasketAfterPayment(access_token: string): Promise<any> {
    console.debug('POST', this.PATH_BASKET);
    try {

      const userInfos = this.jwtService.verify(access_token, {
        secret: process.env.JWT_SECRET,
      });

      if (!userInfos) {
        throw new ErrorResponse('User not found', HttpStatus.NOT_FOUND);
      }

      const user = await this.usersRepository.findOne({
        where: {
          id: userInfos.id,
        },
        relations: {
          basket: true,
        },
      });

      const basketID = user.basket.id;

      fetch(`${this.PATH_BASKET}/`+basketID, {
        method: 'DELETE',
      });

      fetch(`${this.PATH_BASKET}/`+basketID, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: 0
        }),
      });

      return { message: 'Basket removed', status: HttpStatus.OK };

    } catch (err) {
      console.error(err);
      throw new ErrorResponse(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
