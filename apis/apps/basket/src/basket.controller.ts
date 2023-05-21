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
import { BasketService } from './basket.service';
import {
  CreateBasketRequest,
  UpdateBasketRequest,
  Basket,
  AddProductToBasketRequest,
  RemoveProductToBasketRequest,
} from '@app/common';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Patch('add/:uuid')
  @HttpCode(HttpStatus.OK)
  async addProductToBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) addProductToBasketRequest: AddProductToBasketRequest,
  ): Promise<any> {
    return await this.basketService.addProduct(
      uuid,
      addProductToBasketRequest.productId,
    );
  }

  @Patch('remove/:uuid')
  @HttpCode(HttpStatus.OK)
  async removeProductToBasket(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe)
    removeProductToBasketRequest: RemoveProductToBasketRequest,
  ): Promise<any> {
    return await this.basketService.removeProduct(
      uuid,
      removeProductToBasketRequest.productId,
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
