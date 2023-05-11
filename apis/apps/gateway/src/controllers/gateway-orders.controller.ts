import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { GatewayOrderService } from '../services/gateway-orders.service';
import { CreateOrderRequest, UpdateOrderRequest } from '@app/common';
import { Response } from 'express';
import { gatewayResponse } from '../utils/gatewayResponse';

@Controller()
export class GatewayOrderController {
  constructor(private readonly gatewayOrderService: GatewayOrderService) {}

  @Post('orders')
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const order = await this.gatewayOrderService.createOrder(
        createOrderRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: order,
      });
    } catch (err) {
      console.error(err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }

  @Get('orders')
  async findAllOrders(@Res() res: Response) {
    try {
      const orders = await this.gatewayOrderService.findAllOrders();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: orders,
      });
    } catch (err) {
      console.error(err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }

  @Get('orders/:uuid')
  async findOrder(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const order = await this.gatewayOrderService.findOrder(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: order,
      });
    } catch (err) {
      console.error(err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }

  @Patch('orders/:uuid')
  async updateOrder(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateOrderRequest: UpdateOrderRequest,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayOrderService.updateOrder(uuid, updateOrderRequest);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Order updated',
      });
    } catch (err) {
      console.error(err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }

  @Delete('orders/:uuid')
  async deleteOrder(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayOrderService.deleteOrder(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Order deleted',
      });
    } catch (err) {
      console.error(err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }
}
