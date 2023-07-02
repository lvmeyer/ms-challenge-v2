import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  CreateCategoryRequest,
  CreateProductRequest,
  UpdateProductRequest,
} from '@app/common';
import { ErrorResponse } from '@app/common';

@Injectable()
export class GatewayProductService {
  constructor(private readonly configService: ConfigService) {}

  PATH = this.configService.get<string>('HOSTNAME_PRODUCTS') + '/pv/products';
  PATH_CATEGORY =
    this.configService.get<string>('HOSTNAME_PRODUCTS') + '/pv/categories';

  // =============== CATEGORY ===============
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<any> {
    const response = await fetch(this.PATH_CATEGORY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCategoryRequest),
    });
    const res = await response.json();

    if (response.status !== HttpStatus.CREATED) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async findAllCategories(): Promise<any> {
    const response = await fetch(this.PATH_CATEGORY, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`${this.PATH_CATEGORY}/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== HttpStatus.NO_CONTENT) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }

  // ============ PRODUCTS ============
  async createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<any> {
    const response = await fetch(this.PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createProductRequest),
    });
    const res = await response.json();

    if (response.status !== HttpStatus.CREATED) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async findAllProducts(): Promise<any> {
    const response = await fetch(this.PATH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();

    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse(res.message, response.status);
    }
    return res;
  }

  async findProduct(id: string): Promise<any> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    if (response.status !== HttpStatus.OK) {
      throw new ErrorResponse(res.message, response.status);
    }

    return res;
  }

  async updateProduct(
    id: string,
    updateProductRequest: UpdateProductRequest,
  ): Promise<void> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProductRequest),
    });

    if (response.status !== HttpStatus.OK) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${this.PATH}/${id}`, {
      method: 'DELETE',
    });

    if (response.status !== HttpStatus.NO_CONTENT) {
      const res = await response.json();
      throw new ErrorResponse(res.message, response.status);
    }
  }
}
