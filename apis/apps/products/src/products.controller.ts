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
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductRequest, UpdateProductRequest } from '@app/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body(ValidationPipe) createProductRequest: CreateProductRequest,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async find(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Product> {
    return this.productsService.find(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateProductRequest: UpdateProductRequest,
  ): Promise<any> {
    return await this.productsService.update(uuid, updateProductRequest);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.productsService.delete(uuid);
  }
}