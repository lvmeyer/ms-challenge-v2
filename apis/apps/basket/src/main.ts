import { NestFactory } from '@nestjs/core';
import { BasketModule } from './basket.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');

  console.log(`Service Basket on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
