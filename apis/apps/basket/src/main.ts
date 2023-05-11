import { NestFactory } from '@nestjs/core';
import { BasketModule } from './basket.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  const configService = app.get(ConfigService);

  console.log('Service Basket on port:', configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
