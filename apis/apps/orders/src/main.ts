import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  const configService = app.get(ConfigService);
  console.log('Service order on port:', configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
