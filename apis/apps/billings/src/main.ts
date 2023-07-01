import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';

import { BillingsModule } from './billings.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingsModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('PAYMENT'));
  app.connectMicroservice(rmqService.getOptions('AUTH'));
  await app.startAllMicroservices();
}
bootstrap();
