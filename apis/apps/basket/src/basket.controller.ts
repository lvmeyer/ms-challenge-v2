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
import { CreateBasketRequest, UpdateBasketRequest, Basket } from '@app/common';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

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
