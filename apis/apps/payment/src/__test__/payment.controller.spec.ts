// import { Test, TestingModule } from '@nestjs/testing';

<<<<<<< HEAD:apis/apps/payment/src/__test__/payment.controller.spec.ts
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';
=======
// import { PaymentController } from './payment.controller';
// import { PaymentService } from './payment.service';
>>>>>>> 4b6e401 (k8s - ingress - clusterIP for microservices):apis/apps/payment/src/payment.controller.spec.ts

// describe('PaymentController', () => {
//   let paymentController: PaymentController;

<<<<<<< HEAD:apis/apps/payment/src/__test__/payment.controller.spec.ts
  const mockUserService = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    })
      .overrideProvider(PaymentService)
      .useValue(mockUserService)
      .compile();
=======
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [PaymentController],
//       providers: [PaymentService],
//     }).compile();
>>>>>>> 4b6e401 (k8s - ingress - clusterIP for microservices):apis/apps/payment/src/payment.controller.spec.ts

//     paymentController = app.get<PaymentController>(PaymentController);
//   });

<<<<<<< HEAD:apis/apps/payment/src/__test__/payment.controller.spec.ts
  describe('root', () => {
    it('should be defined"', () => {
      expect(paymentController).toBeDefined();
    });
  });
});
=======
//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(paymentController.validPayment()).toEqual({
//         message: 'Payment is valid',
//       });
//     });
//   });
// });
>>>>>>> 4b6e401 (k8s - ingress - clusterIP for microservices):apis/apps/payment/src/payment.controller.spec.ts
