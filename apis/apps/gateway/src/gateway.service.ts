import { Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/orders/orders.request';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async create(createOrderRequest: CreateOrderRequest) {
    const response = await fetch(
      this.configService.get<string>('PORT_ORDERS'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createOrderRequest),
      },
    );
    if (response.status !== 201) {
      throw new Error('Failed to create order');
    }
    return response.json();
  }
}
