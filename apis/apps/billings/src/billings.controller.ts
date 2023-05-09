import { Controller, Get } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @EventPattern('create-order')
  getHello(): string {
    console.log('PROC');
    return this.billingsService.getHello();
  }
}
