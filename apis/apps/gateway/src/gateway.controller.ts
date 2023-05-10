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
import { GatewayService } from './gateway.service';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
} from './dto/orders/orders.request';
import { Response } from 'express';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('orders')
  async createOrder(
    @Body(ValidationPipe) createOrderRequest: CreateOrderRequest,
  ): Promise<{ success: boolean; order?: any; message?: any }> {
    try {
      const order = await this.gatewayService.createOrder(createOrderRequest);
      return { success: true, order };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Failed to create order' };
    }
  }

  @Get('orders')
  async findAllOrders() {
    try {
      return await this.gatewayService.findAllOrders();
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  @Get('orders/:uuid')
  async findOrder(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const order = await this.gatewayService.findOrder(uuid);
      return res.status(HttpStatus.OK).json({
        success: true,
        order,
      });
    } catch (err) {
      console.log(err);

      res.status(err.status).json({
        message: err.message,
        success: false,
        // name: err.name,
        // status: err.status,
      });
      // return {
      //   success: false,
      //   name: err.name,
      //   message: err.message,
      //   status: err.status,
      // };
    }
  }

  @Patch('orders/:uuid')
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateOrderRequest: UpdateOrderRequest,
  ) {
    try {
      await this.gatewayService.updateOrder(uuid, updateOrderRequest);
      return { success: true, message: 'Order updated' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // @Delete('orders/:uuid')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteOrder(@Param('uuid', ParseUUIDPipe) uuid: string) {
  //   try {
  //     await this.gatewayService.deleteOrder(uuid);
  //     return { success: true, message: 'Order deleted' };
  //   } catch (err) {
  //     return { success: false, message: err.message };
  //   }
  // }
}
