import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';
import { Test, TestingModule } from '@nestjs/testing';

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
