import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingsService {
  getHello(): string {
    return 'Hello World!';
  }
}
