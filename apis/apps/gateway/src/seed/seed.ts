import { NestFactory } from '@nestjs/core';
import { GatewayModule } from '../gateway.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(GatewayModule);
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.close();
}

bootstrap();
