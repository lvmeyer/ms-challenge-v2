import { Response } from 'express';
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

import { CreateProductRequest, UpdateProductRequest } from '@app/common';
import { gatewayResponse } from '../utils/gatewayResponse';
import { GatewayProductService } from '../services/gateway-products.service';

@Controller('api/v1/products')
export class GatewayProductController {
  constructor(private readonly gatewayProductService: GatewayProductService) {}

  @Post()
  async createProduct(
    @Body(ValidationPipe) createProductRequest: CreateProductRequest,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const product = await this.gatewayProductService.createProduct(
        createProductRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: product,
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

  @Get()
  async findAllProducts(@Res() res: Response) {
    try {
      const products = await this.gatewayProductService.findAllProducts();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: products,
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

  @Get(':uuid')
  async findProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const product = await this.gatewayProductService.findProduct(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: product,
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

  @Patch(':uuid')
  async updateProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateProductRequest: UpdateProductRequest,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayProductService.updateProduct(
        uuid,
        updateProductRequest,
      );
      console.error('POUET1=');

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Product updated',
      });
    } catch (err) {
      console.error('POUET2==', err);
      return gatewayResponse({
        res,
        status: err.status,
        success: false,
        message: err.message,
      });
    }
  }

  @Delete(':uuid')
  async deleteProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayProductService.deleteProduct(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Product deleted',
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
