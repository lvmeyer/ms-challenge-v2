import { Response } from 'express';
import { Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { gatewayResponse } from '../utils/gatewayResponse';

import { GatewayPaymentService } from '../services/gateway-payment.service';

@Controller('api/v1/payment')
export class GatewayPaymentController {
  constructor(private readonly gatewayPaymentService: GatewayPaymentService) {}

  @Post('pay')
  async pay(@Res() res: Response) {
    try {
      const paymentResponse = await this.gatewayPaymentService.pay();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Payment successful',
        data: paymentResponse,
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
