import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const configService = app.get(ConfigService);

  const PORT =
    configService.get('ENV_APP') === 'dev'
      ? configService.get('PORT_DEV')
      : configService.get('PORT_PROD');

  console.log(`Service Product on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
