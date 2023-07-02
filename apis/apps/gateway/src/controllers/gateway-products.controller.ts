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
  CreateCategoryRequest,
  CreateProductRequest,
  UpdateProductRequest,
} from '@app/common';
import { gatewayResponse } from '../utils/gatewayResponse';
import { GatewayProductService } from '../services/gateway-products.service';
import { AuthRequired, HasRole } from '../auth/auth.decorator';
import { Role } from '../auth/auth.enum';

@Controller('api/v1')
export class GatewayProductController {
  constructor(private readonly gatewayProductService: GatewayProductService) {}

  // =============== CATEGORY ===============
  @Post('categories')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Body(ValidationPipe) createCategoryRequest: CreateCategoryRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const category = await this.gatewayProductService.createCategory(
        createCategoryRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: category,
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

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  async findAllCategories(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const categories = await this.gatewayProductService.findAllCategories();

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: categories,
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

  @Delete('categories/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.deleteCategory(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Category deleted',
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

  // ============ PRODUCTS ============
  @Post('products')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body(ValidationPipe) createProductRequest: CreateProductRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
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

  @Get('products')
  @HttpCode(HttpStatus.OK)
  async findAllProducts(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
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

  @Get('products/:uuid')
  @HttpCode(HttpStatus.OK)
  async findProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
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

  @Patch('products/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) updateProductRequest: UpdateProductRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.updateProduct(
        uuid,
        updateProductRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Product updated',
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

  @Delete('products/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
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
