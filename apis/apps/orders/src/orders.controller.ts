import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest, UpdateOrderRequest, Order } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
  ): Promise<Order> {
    return await this.ordersService.createOrder(createOrderRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async find(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Order> {
    return this.ordersService.find(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateOrderRequest: UpdateOrderRequest,
  ): Promise<any> {
    return await this.ordersService.update(uuid, updateOrderRequest);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.ordersService.delete(uuid);
  }
}
