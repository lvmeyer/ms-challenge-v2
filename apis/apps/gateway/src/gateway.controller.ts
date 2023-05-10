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
import { GatewayService } from './gateway.service';
import { CreateOrderRequest, UpdateOrderRequest } from '@app/common';
import { Response } from 'express';
import { gatewayResponse } from './utils/gatewayResponse';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('orders')
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const order = await this.gatewayService.createOrder(createOrderRequest);

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: order,
      });
    } catch (err) {
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
      const orders = await this.gatewayService.findAllOrders();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: orders,
      });
    } catch (err) {
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
      const order = await this.gatewayService.findOrder(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: order,
      });
    } catch (err) {
      console.log(err.message);
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
      await this.gatewayService.updateOrder(uuid, updateOrderRequest);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Order updated',
      });
    } catch (err) {
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
      await this.gatewayService.deleteOrder(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Order deleted',
      });
    } catch (err) {
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }
}
