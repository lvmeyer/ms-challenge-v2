import { Controller, Post } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller('pv')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment')
  validPayment() {
    return this.paymentService.handleValidPayment();
  }
}
