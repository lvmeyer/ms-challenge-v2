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
import { UpdateResult } from 'typeorm';

import {
  CreateProductRequest,
  UpdateProductRequest,
  CreateCategoryRequest,
  Product,
  Category,
} from '@app/common';
import { ProductsService } from './products.service';

@Controller('pv')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ================== CTGS =================
  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Body(ValidationPipe) createCategoryRequest: CreateCategoryRequest,
  ): Promise<Category> {
    return await this.productsService.createCategory(createCategoryRequest);
  }

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  async findAllCategories(): Promise<Category[]> {
    return this.productsService.findAllCategories();
  }

  @Delete('categories/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<void> {
    return await this.productsService.deleteCategory(uuid);
  }

  // ================== PDTS ==================
  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body(ValidationPipe) createProductRequest: CreateProductRequest,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductRequest);
  }

  @Get('products')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('products/:uuid')
  @HttpCode(HttpStatus.OK)
  async find(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Product> {
    return this.productsService.find(uuid);
  }

  @Patch('products/:uuid')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateProductRequest: UpdateProductRequest,
  ): Promise<UpdateResult> {
    return await this.productsService.update(uuid, updateProductRequest);
  }

  @Delete('products/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    await this.productsService.delete(uuid);
  }
}
