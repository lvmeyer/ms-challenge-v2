import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { BillingsService } from './billings.service';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @EventPattern('create-billing')
  sendBillToUser(data: { email: string; price: number }): Promise<void> {
    return this.billingsService.sendBillToUser(data.email, data.price);
  }

  @EventPattern('register-user')
  registerUser(data: {
    email: string;
    firstname: string;
    lastname: string;
  }): Promise<void> {
    return this.billingsService.sendWelcomeMail(
      data.email,
      data.firstname,
      data.lastname,
    );
  }
}
