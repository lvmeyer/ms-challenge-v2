import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateOrderRequest } from './dto/orders/orders.request';

@Controller('orders')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
  ): Promise<{ success: boolean; order?: any; message?: any }> {
    try {
      const order = await this.gatewayService.create(createOrderRequest);
      return { success: true, order };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Failed to create order' };
    }
  }
}
