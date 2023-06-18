import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayPingService {
  constructor(private readonly configService: ConfigService) {}

  // PATH = this.configService.get<string>('PORT_PRODUCTS') + '/pv/products';

  async ping() {
    return { pong: 'pong' };
  }
}
