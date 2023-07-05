import { Controller, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.service';


@Controller('pv')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment')
  async validPayment(
    @Body('price') price: number,
  ) {
    return this.paymentService.handleValidPayment(price);
  }
}