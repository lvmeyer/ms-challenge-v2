import { Response } from 'express';
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

import {
  AddProductToBasketRequest,
  CreateBasketRequest,
  RemoveProductFromBasketRequest,
  UpdateBasketRequest,
} from '@app/common';
import { gatewayResponse } from '../utils/gatewayResponse';
import { GatewayBasketService } from '../services/gateway-basket.service';
import { AuthRequired } from '../auth/auth.decorator';

@Controller('api/v1/basket')
export class GatewayBasketController {
  constructor(private readonly gatewayBasketService: GatewayBasketService) {}

  @Get(':uuid/products')
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async findBasketWithProducts(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const basket = await this.gatewayBasketService.findBasketWithProducts(
        uuid,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: basket,
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

  @Patch('add')
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async addProductToBasket(
    @Body(ValidationPipe) addProductToBasketRequest: AddProductToBasketRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayBasketService.addProduct(
        addProductToBasketRequest.basketId,
        addProductToBasketRequest.productId,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Product added to basket',
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

  @Patch('remove')
  @AuthRequired()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProductFromBasket(
    @Body(ValidationPipe)
    removeProductFromBasketRequest: RemoveProductFromBasketRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayBasketService.removeProduct(
        removeProductFromBasketRequest.basketId,
        removeProductFromBasketRequest.productId,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Product removed from basket',
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

  // ---------------------------------------
  // ---------------- CRUD -----------------
  // ---------------------------------------
  @Post()
  @AuthRequired()
  @HttpCode(HttpStatus.CREATED)
  async createBasket(
    @Body(ValidationPipe) createBasketRequest: CreateBasketRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const basket = await this.gatewayBasketService.createBasket(
        createBasketRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: basket,
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
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async findAllBaskets(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const basket = await this.gatewayBasketService.findAllBaskets();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: basket,
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
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async findBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const basket = await this.gatewayBasketService.findBasket(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: basket,
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
  @AuthRequired()
  @HttpCode(HttpStatus.OK)
  async updateBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateBasketRequest: UpdateBasketRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayBasketService.updateBasket(uuid, updateBasketRequest);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Basket updated',
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

  @Delete(':uuid')
  @AuthRequired()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayBasketService.deleteBasket(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Basket deleted',
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
