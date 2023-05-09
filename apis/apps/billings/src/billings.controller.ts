import { Controller, Get } from '@nestjs/common';
import { BillingsService } from './billings.service';

@Controller()
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  getHello(): string {
    return this.billingsService.getHello();
  }
}
