import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { Category, Product } from '@app/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { createProductMock } from './fixtures/products';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductRepository = {
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id, ...dto })),
  };
  const mockCategoryRepository = {};

  const id = randomUUID();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = app.get<ProductsService>(ProductsService);
  });

  it('should be defined"', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a new product', async () => {
    expect(await service.createProduct({ ...createProductMock })).toEqual({
      id,
      ...createProductMock,
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsService } from '../products.service';
// import { Category, Product } from '@app/common';
// import { getRepositoryToken } from '@nestjs/typeorm';

// describe('ProductsService', () => {
//   let service: ProductsService;

//   const mockProductRepository = {};
//   const mockCategoryRepository = {};

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductsService,
//         {
//           provide: getRepositoryToken(Product),
//           useValue: mockProductRepository,
//         },
//         {
//           provide: getRepositoryToken(Category),
//           useValue: mockCategoryRepository,
//         },
//       ],
//     }).compile();

//     service = app.get<ProductsService>(ProductsService);
//   });

//   it('should be defined"', () => {
//     expect(service).toBeDefined();
//   });
// });
