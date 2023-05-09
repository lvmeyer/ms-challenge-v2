import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderRequest } from './dto/orders.request';
import { Response } from 'express';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ): Promise<any> {
    const order = await this.ordersService.createOrder(createOrderRequest);
    res.status(HttpStatus.CREATED).json(order);
  }
}
