import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayPingService {
  async ping() {
    return { pong: 'pong' };
  }
}
