import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductRequest, UpdateProductRequest } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from '@app/common';

@Injectable()
export class GatewayProductService {
  constructor(private readonly configService: ConfigService) {}

  PATH = this.configService.get<string>('PORT_PRODUCTS') + '/products';

  async createProduct(createProductRequest: CreateProductRequest) {
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

  async findAllProducts() {
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

  async findProduct(id: string) {
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
