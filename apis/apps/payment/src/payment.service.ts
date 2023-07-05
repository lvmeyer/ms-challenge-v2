import { Body, Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigService } from '@nestjs/config';
=======
>>>>>>> 4764724 (finish stripe payement)
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

  async handleValidPayment(@Body('price') price: number): Promise<any> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: price * 100,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        confirm: false,
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
