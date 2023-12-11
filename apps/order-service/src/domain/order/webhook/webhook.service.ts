import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { OrderEntity } from '../entity/order.entity';
import { Repository } from 'typeorm';
// this is the Stripe webhook service that will be used to handle Stripe events and update the database accordingly
@Injectable()
export class WebhookService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {
    this.stripe = new Stripe(process.env.apiKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  async webhook(body: any, signature: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.log(error);
      throw new Error(`Webhook error: ${error.message}`);
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];
    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(', ');
    if (event.type === 'checkout.session.completed') {
      const order = await this.orderRepo.findOne({
        where: { id: session.id },
      });
      if (order) {
        order.address = addressString;
        order.payment_status = 'completed';
        order.phone = session?.customer_details?.phone || '';
        await order.save();
      }
    }
    return { received: true };
  }
}
