import { NestFactory } from '@nestjs/core';
import { BasketModule } from './basket.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  const configService = app.get(ConfigService);

  const PORT =
    configService.get('ENV_APP') === 'dev'
      ? configService.get('PORT_DEV')
      : configService.get('PORT_PROD');

  console.log(`Service Basket on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
