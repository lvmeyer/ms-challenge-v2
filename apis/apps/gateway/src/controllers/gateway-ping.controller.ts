import { Controller, Get } from '@nestjs/common';
import { GatewayPingService } from '../services/gateway-ping.service';

@Controller('')
export class GatewayPingController {
  constructor(private readonly gatewayPingService: GatewayPingService) {}

  @Get()
  ping() {
    return this.gatewayPingService.ping();
  }
}