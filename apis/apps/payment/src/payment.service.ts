<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
=======
import { Body, Injectable } from '@nestjs/common';
>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc
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

  async handleValidPayment(@Body('price') price: number): Promise<any> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
<<<<<<< HEAD
        amount: 100,
        currency: 'eur',
        payment_method: 'pm_card_visa',
        confirm: true,
=======
        amount: price * 100,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        confirm: false,
>>>>>>> 0164910996a5c928bd32567a63cd3e6f40bc81dc
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
