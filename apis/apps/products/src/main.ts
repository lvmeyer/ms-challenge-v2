import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const configService = app.get(ConfigService);

  console.log('Service product on port:', configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
