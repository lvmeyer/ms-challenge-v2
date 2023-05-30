import { Controller } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @EventPattern('create-billing')
  getHello(data): string {
    console.log('PROC', data);
    return this.billingsService.getHello();
  }
}
