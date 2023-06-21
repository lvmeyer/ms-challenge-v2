import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { BillingsService } from './billings.service';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @EventPattern('create-billing')
  getHello(data): string {
    console.log('PROC', data);
    return this.billingsService.getHello();
  }
}
