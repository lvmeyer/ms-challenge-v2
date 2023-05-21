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
import { GatewayBasketService } from '../services/gateway-basket.service';
import {
  AddProductToBasketRequest,
  CreateBasketRequest,
  RemoveProductFromBasketRequest,
  UpdateBasketRequest,
} from '@app/common';
import { Response } from 'express';
import { gatewayResponse } from '../utils/gatewayResponse';

@Controller('api/basket')
export class GatewayBasketController {
  constructor(private readonly gatewayBasketService: GatewayBasketService) {}

  @Get(':uuid/products')
  async findBasketWithProducts(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<any> {
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

  @Patch('add/:uuid')
  async addProductToBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) addProductToBasketRequest: AddProductToBasketRequest,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayBasketService.addProduct(
        uuid,
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

  @Patch('remove/:uuid')
  async removeProductFromBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe)
    removeProductFromBasketRequest: RemoveProductFromBasketRequest,
    @Res() res: Response,
  ) {
    try {
      await this.gatewayBasketService.removeProduct(
        uuid,
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
  async createBasket(
    @Body(ValidationPipe) createBasketRequest: CreateBasketRequest,
    @Res() res: Response,
  ): Promise<any> {
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
  async findAllBaskets(@Res() res: Response) {
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
  async findBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<any> {
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
  async updateBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateBasketRequest: UpdateBasketRequest,
    @Res() res: Response,
  ) {
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
  async deleteBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ) {
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
