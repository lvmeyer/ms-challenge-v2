import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest, UpdateOrderRequest } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from '@app/common';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  PATH = this.configService.get<string>('PORT_ORDERS') + '/api/orders';

  async createOrder(createOrderRequest: CreateOrderRequest) {
    const response = await fetch(this.PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createOrderRequest),
    });
    if (response.status !== HttpStatus.CREATED) {
      throw new ErrorResponse('Failed to create order', response.status);
    }
    return response.json();
  }

  async findAllOrders() {
    const response = await fetch(this.PATH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse('Failed to fetch orders', response.status);
    }
    return response.json();
  }

  async findOrder(id: string) {
    try {
      const response = await fetch(`${this.PATH}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== HttpStatus.OK) {
        throw new ErrorResponse('Failed to fetch order', response.status);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(
    id: string,
    updateOrderRequest: UpdateOrderRequest,
  ): Promise<void> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateOrderRequest),
    });

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse('Failed to update order', response.status);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    const { status } = await fetch(`${this.PATH}/${id}`, {
      method: 'DELETE',
    });

    if (status !== HttpStatus.NO_CONTENT) {
      throw new ErrorResponse('Failed to delete order', status);
    }
  }
}
