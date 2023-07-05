import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT_GW') || 80;

  const corsOptions: CorsOptions = {
    origin: ['https://bando-chall.vercel.app/', 'http://localhost'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  };


  console.info(`Service GW on port: ${PORT}`);
  app.enableCors(corsOptions);
  await app.listen(PORT);
}
bootstrap();
