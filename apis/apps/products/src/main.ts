import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');

  console.log(`Service Product on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
