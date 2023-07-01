import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingsService {
  sendBillToUser(): string {
    return 'RMQ: Bill sent to user!';
  }

  sendWelcomeMail(): string {
    return 'RMQ: Welcome to the app!';
  }
}
