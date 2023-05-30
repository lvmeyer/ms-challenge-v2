import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  const PORT =
    configService.get('ENV_APP') === 'dev'
      ? configService.get('PORT_DEV')
      : configService.get('PORT_PROD');

  console.log(`Service GW on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
