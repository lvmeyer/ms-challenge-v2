import { Controller, Get } from '@nestjs/common';

@Controller('')
export class GatewayPingController {
  @Get()
  ping() {
    return 'pong';
  }
}
