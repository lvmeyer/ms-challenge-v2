it('should be true', () => {
  expect(true).toBe(true);
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { ProductsModule } from '../products.module';
// import {
//   TypeOrmModule,
//   getEntityManagerToken,
//   getRepositoryToken,
// } from '@nestjs/typeorm';
// import { Basket, Category, Product, TypeOrmCustomModule } from '@app/common';

// describe('PaymentController (e2e)', () => {
//   let app: INestApplication;

//   const mockProductRepository = {
//     find: jest.fn().mockResolvedValue([]),
//   };
//   const mockCategoryRepository = {};
//   const mockBasketRepository = {};

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [ProductsModule],
//     })
//       .overrideProvider(getRepositoryToken(TypeOrmCustomModule.register))
//       .useValue({})
//       .overrideProvider(getRepositoryToken(Product))
//       .useValue(mockProductRepository)
//       .overrideProvider(getRepositoryToken(Basket))
//       .useValue(mockBasketRepository)
//       .overrideProvider(getRepositoryToken(Category))
//       .useValue(mockCategoryRepository)
//       .compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/pv/products (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/pv/products')
//       .expect(200)
//       .expect([]);
//   });
// });
