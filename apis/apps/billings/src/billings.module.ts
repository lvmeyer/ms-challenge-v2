import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqModule } from '@app/common';
import { BillingsController } from './billings.controller';
import { BillingsService } from './billings.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_AUTH_QUEUE: Joi.string().required(),
        RABBITMQ_PAYMENT_QUEUE: Joi.string().required(),
        NODEMAILER_USER: Joi.string().required(),
        NODEMAILER_PASS: Joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [BillingsController],
  providers: [BillingsService],
})
export class BillingsModule {}
