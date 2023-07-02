import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ErrorResponse } from '@app/common';
import { CreateBasketRequest, UpdateBasketRequest } from '@app/common';

@Injectable()
export class GatewayBasketService {
  constructor(private readonly configService: ConfigService) {}

  PATH = this.configService.get<string>('HOSTNAME_BASKET') + '/pv/basket';

  async findBasketWithProducts(id: string) {
    console.info('GET', this.PATH);
    try {
      const response = await fetch(`${this.PATH}/${id}/products`, {
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

  async addProduct(basketId: string, productId: string): Promise<void> {
    console.info('POST', this.PATH);
    const response = await fetch(`${this.PATH}/add`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ basketId, productId }),
    });

    if (response.status !== HttpStatus.OK) {
      const res = await response.json();

      throw new ErrorResponse(res.message, response.status);
    }
  }

  async removeProduct(basketId: string, productId: string): Promise<void> {
    console.info('DELETE', this.PATH);
    const response = await fetch(`${this.PATH}/remove`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ basketId, productId }),
    });

    if (response.status !== HttpStatus.OK) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }

  async createBasket(createBasketRequest: CreateBasketRequest): Promise<any> {
    console.info('POST', this.PATH);
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

  async findAllBaskets(): Promise<any> {
    console.info('GET', this.PATH);
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

  async findBasket(id: string): Promise<any> {
    console.info('GET', this.PATH);
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
    console.info('PATCH', this.PATH);
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
    console.info('DELETE', this.PATH);
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== HttpStatus.NO_CONTENT) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }
}
