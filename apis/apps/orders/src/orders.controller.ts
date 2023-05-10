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
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderRequest, UpdateOrderRequest } from './dto/orders.request';
import { Response } from 'express';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ): Promise<any> {
    const order = await this.ordersService.createOrder(createOrderRequest);
    res.status(HttpStatus.CREATED).json(order);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async find(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Order> {
    try {
      const order = await this.ordersService.find(uuid);
      return order;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateOrderRequest: UpdateOrderRequest,
  ): Promise<any> {
    try {
      await this.ordersService.update(uuid, updateOrderRequest);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    try {
      await this.ordersService.delete(uuid);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
