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
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateBasketRequest,
  UpdateBasketRequest,
  Basket,
  AddProductToBasketRequest,
  RemoveProductFromBasketRequest,
} from '@app/common';
import { BasketService } from './basket.service';

@Controller('pv/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Patch('add')
  @HttpCode(HttpStatus.OK)
  async addProductToBasket(
    @Body(ValidationPipe) addProductToBasketRequest: AddProductToBasketRequest,
  ): Promise<void> {
    await this.basketService.addProduct(
      addProductToBasketRequest.basketId,
      addProductToBasketRequest.productId,
    );
  }

  @Patch('remove')
  @HttpCode(HttpStatus.OK)
  async removeProductFromBasket(
    @Body(ValidationPipe)
    removeProductFromBasketRequest: RemoveProductFromBasketRequest,
  ): Promise<any> {
    return await this.basketService.removeProduct(
      removeProductFromBasketRequest.basketId,
      removeProductFromBasketRequest.productId,
    );
  }

  // ---------------------------------------
  // ---------------- CRUD -----------------
  // ---------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBasket(
    @Body(ValidationPipe) createBasketRequest: CreateBasketRequest,
  ): Promise<Basket> {
    return await this.basketService.createBasket(createBasketRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Basket[]> {
    return this.basketService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async find(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Basket> {
    return this.basketService.find(uuid);
  }

  @Get(':uuid/products')
  @HttpCode(HttpStatus.OK)
  async findWithProducts(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Basket> {
    return this.basketService.findWithProducts(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateBasketRequest: UpdateBasketRequest,
  ): Promise<any> {
    return await this.basketService.update(uuid, updateBasketRequest);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.basketService.delete(uuid);
  }
}
