import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT_PRODUCTS') || 80;

  app.enableCors();
  console.info(`Service Product on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
