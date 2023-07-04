import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async handleValidPayment(): Promise<any> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 100,
        currency: 'eur',
        payment_method: 'pm_card_visa',
        confirm: true,
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        message: 'LEEEEEETS GOOOO !',
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
