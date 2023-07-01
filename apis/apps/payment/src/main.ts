import { NestFactory } from '@nestjs/core';

import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT_PAYMENT') || 80;

  app.enableCors();
  console.info(`Service Payment on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
