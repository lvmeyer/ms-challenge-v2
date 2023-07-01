import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { BillingsService } from './billings.service';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @EventPattern('create-billing')
  sendBillToUser(data): string {
    console.info('PROC rmq: create-billing', data);
    return this.billingsService.sendBillToUser();
  }

  @EventPattern('register-user')
  registerUser(data): string {
    console.info('PROC rmq: register-user', data);
    return this.billingsService.sendWelcomeMail();
  }
}
