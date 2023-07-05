import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';
import { Test, TestingModule } from '@nestjs/testing';

<<<<<<< HEAD:apis/apps/payment/src/__test__/payment.controller.spec.ts
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';

=======
>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc:apis/apps/payment/src/payment.controller.spec.ts
describe('PaymentController', () => {
  let paymentController: PaymentController;

  const mockUserService = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    })
      .overrideProvider(PaymentService)
      .useValue(mockUserService)
      .compile();

    paymentController = app.get<PaymentController>(PaymentController);
  });

  describe('root', () => {
    it('should be defined"', () => {
      expect(paymentController).toBeDefined();
    });
  });
});
