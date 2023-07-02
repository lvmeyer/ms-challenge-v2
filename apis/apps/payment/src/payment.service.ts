import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  handleValidPayment() {
    // TODO: Stripe payment logic
    return { message: 'Payment is valid' };
  }
}
