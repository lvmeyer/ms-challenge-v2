import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { createProductMock, updateProductMock } from './fixtures/products';
import { Product } from '@app/common';

describe('ProductsController', () => {
  let productsController: ProductsController;

  const mockProductsService = {
    createProduct: jest.fn(async (dto): Promise<Product> => {
      return {
        id: randomUUID(),
        ...dto,
      };
    }),
    update: jest.fn(async (id, dto): Promise<Product> => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  it('should be defined"', () => {
    expect(productsController).toBeDefined();
  });

  it('should return a product', () => {
    expect(
      productsController.createProduct({
        ...createProductMock,
      }),
    ).toEqual(
      mockProductsService.createProduct({
        id: expect.any(String),
        ...createProductMock,
      }),
    );
  });

  it('should update a product', () => {
    const id = randomUUID();
    const dto = {
      id,
      ...updateProductMock,
    };
    expect(productsController.update(id, dto)).toEqual(
      mockProductsService.update(id, dto),
    );
  });
});
