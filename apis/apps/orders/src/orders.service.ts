import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  constructor(@Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  createOrder() {
    this.billingClient.emit('create-order', {});
  }
}
