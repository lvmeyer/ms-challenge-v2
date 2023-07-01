import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  handleValidPayment() {
    return { message: 'Payment is valid' };
  }
}
