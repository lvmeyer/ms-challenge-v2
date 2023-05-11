import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBasketRequest, UpdateBasketRequest } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from '@app/common';

@Injectable()
export class GatewayBasketService {
  constructor(
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  PATH = this.configService.get<string>('PORT_BASKET') + '/basket';

  async createBasket(createBasketRequest: CreateBasketRequest) {
    console.log('PROC', this.PATH);
    const response = await fetch(this.PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createBasketRequest),
    });
    const res = await response.json();

    if (response.status !== HttpStatus.CREATED) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async findAllBaskets() {
    const response = await fetch(this.PATH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async findBasket(id: string) {
    try {
      const response = await fetch(`${this.PATH}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await response.json();
      if (response.status !== HttpStatus.OK) {
        throw new ErrorResponse(res?.message, response.status);
      }

      return res;
    } catch (err) {
      throw err;
    }
  }

  async updateBasket(
    id: string,
    updateBasketRequest: UpdateBasketRequest,
  ): Promise<void> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateBasketRequest),
    });

    if (response.status !== HttpStatus.OK) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }

  async deleteBasket(id: string): Promise<void> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== HttpStatus.NO_CONTENT) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }
}
