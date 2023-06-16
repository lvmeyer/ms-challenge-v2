import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  // const PORT = configService.get('PORT');

  // console.log(`Service GW on port: ${PORT}`);
  console.log(`Service GW on port: 80`);
  app.enableCors();
  await app.listen(80);
  // await app.listen(PORT);
}
bootstrap();
