import { Test, TestingModule } from '@nestjs/testing';
import { BillingsController } from './billings.controller';
import { BillingsService } from './billings.service';

describe('BillingsController', () => {
  let billingsController: BillingsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingsController],
      providers: [BillingsService],
    }).compile();

    billingsController = app.get<BillingsController>(BillingsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingsController.getHello()).toBe('Hello World!');
    });
  });
});
