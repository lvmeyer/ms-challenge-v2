import { Response } from 'express';
import { Controller, Headers, HttpStatus, Post, Res } from '@nestjs/common';

import { gatewayResponse } from '../utils/gatewayResponse';

import { GatewayPaymentService } from '../services/gateway-payment.service';
import { AuthRequired } from '../auth/auth.decorator';

@Controller('api/v1/payment')
export class GatewayPaymentController {
  constructor(private readonly gatewayPaymentService: GatewayPaymentService) {}

  @Post('pay')
  @AuthRequired()
  async pay(
    @Headers() headers: any,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const access_token = headers.authorization.split(' ')[1];

    try {
      const paymentResponse = await this.gatewayPaymentService.pay(
        access_token,
      );

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
        status: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message || err,
      });
    }
  }
}
