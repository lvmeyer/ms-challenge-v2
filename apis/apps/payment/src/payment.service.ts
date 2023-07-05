import { Body, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async handleValidPayment(
    @Body('price') price: number,
  ): Promise<any> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: price*100,
        currency: 'usd',
        payment_method: "pm_card_visa",
        confirm: false,
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        message: 'LEEEEEETS GOOOO !',
        clientSecret: paymentIntent.client_secret
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
