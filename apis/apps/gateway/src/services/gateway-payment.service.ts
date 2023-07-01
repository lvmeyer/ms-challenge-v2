import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import { PAYMENT_SERVICE, ErrorResponse } from '@app/common';

@Injectable()
export class GatewayPaymentService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(PAYMENT_SERVICE) private paymentClient: ClientProxy,
  ) {}

  PATH = this.configService.get<string>('HOSTNAME_PAYMENT') + '/pv/payment';

  async pay() {
    console.debug('POST', this.PATH);
    const response = await fetch(this.PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();

    if (response.status !== HttpStatus.CREATED) {
      throw new ErrorResponse(res.message, response.status);
    }
    this.paymentClient.emit('create-billing', {
      data: 'PC basket',
    });

    return res;
  }
}
