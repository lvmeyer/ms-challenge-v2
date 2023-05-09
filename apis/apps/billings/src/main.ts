import { NestFactory } from '@nestjs/core';
import { BillingsModule } from './billings.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingsModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('BILLINGS'));
  await app.startAllMicroservices();
}
bootstrap();
