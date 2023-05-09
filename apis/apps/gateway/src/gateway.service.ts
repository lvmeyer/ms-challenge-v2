import { Inject, Injectable } from '@nestjs/common';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  createOrder() {
    this.billingClient.emit('create-order', {});
  }
}
