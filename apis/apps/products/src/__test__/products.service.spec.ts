import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
<<<<<<< HEAD
import { Category, Product } from '@app/common';
=======
import { Category, Product, Review } from '@app/common';
>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc
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

<<<<<<< HEAD
=======
  const mockReviewRepository = {};

>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc
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
<<<<<<< HEAD
=======
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc
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
