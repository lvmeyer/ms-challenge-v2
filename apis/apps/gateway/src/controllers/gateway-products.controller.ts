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
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateCategoryRequest,
  CreateProductRequest,
  CreateReviewRequest,
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

  @Patch('products/quantity/:uuid')
  @AuthRequired()
  @HasRole(Role.USER)
  @HttpCode(HttpStatus.OK)
  async updateProductStock(
      @Param('uuid', ParseUUIDPipe) uuid: string,
      @Body(ValidationPipe) updateQuantityRequest: UpdateProductRequest,
      @Res() res: Response,
    ): Promise<Response<any, Record<string, any>>> {
      try {
        await this.gatewayProductService.updateProduct(
          uuid,
          updateQuantityRequest,
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

  // ============ PRODUCT REVIEWS ============
  @Post('reviews')
  @AuthRequired()
  @HasRole(Role.USER)
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @Body(ValidationPipe) createReviewRequest: CreateReviewRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const review = await this.gatewayProductService.createReview(
        createReviewRequest,
      );

      return gatewayResponse({
        res,
        status: HttpStatus.CREATED,
        success: true,
        data: review,
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

  @Delete('reviews/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.deleteReview(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Review deleted',
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

  @Get('reviews')
  @HttpCode(HttpStatus.OK)
  async findAllReviews(
    @Query('reportNb') reportNb: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (!reportNb || reportNb < 0) {
        reportNb = 0;
      }
      const reviews = await this.gatewayProductService.findAllReviews(reportNb);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        data: reviews,
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

  @Patch('reviews/report/:uuid')
  @AuthRequired()
  @HasRole(Role.USER)
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.updateReview(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.OK,
        success: true,
        message: 'Review updated',
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

  @Delete('reviews/report/approve/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async approveReportReview(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.approveReportedReview(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Review deleted',
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

  @Patch('reviews/report/decline/:uuid')
  @AuthRequired()
  @HasRole(Role.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async declineReportReview(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.gatewayProductService.declineReportedReview(uuid);

      return gatewayResponse({
        res,
        status: HttpStatus.NO_CONTENT,
        success: true,
        message: 'Review unbaned',
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
