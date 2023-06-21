import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { BasketModule } from './basket.module';

async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT_BASKET') || 80;

  console.info(`Service Basket on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
