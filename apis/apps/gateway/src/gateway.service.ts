import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
} from './dto/orders/orders.request';
import { ConfigService } from '@nestjs/config';

const PATH = '/api/orders';

class ErrorResponse extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

@Injectable()
export class GatewayService {
  constructor(
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async createOrder(createOrderRequest: CreateOrderRequest) {
    const response = await fetch(
      `${this.configService.get<string>('PORT_ORDERS')}${PATH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createOrderRequest),
      },
    );
    if (response.status !== HttpStatus.CREATED) {
      throw new Error('Failed to create order');
    }
    return response.json();
  }

  async findAllOrders() {
    const response = await fetch(
      `${this.configService.get<string>('PORT_ORDERS')}${PATH}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status !== HttpStatus.OK) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  }

  async findOrder(id: string) {
    try {
      const response = await fetch(
        `${this.configService.get<string>('PORT_ORDERS')}${PATH}/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

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
    const response = await fetch(
      `${this.configService.get<string>('PORT_ORDERS')}${PATH}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateOrderRequest),
      },
    );

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse('Failed to update order', response.status);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    const { status } = await fetch(
      `${this.configService.get<string>('PORT_ORDERS')}${PATH}/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (status !== HttpStatus.NO_CONTENT) {
      throw new ErrorResponse('Failed to delete order', status);
    }
  }
}
