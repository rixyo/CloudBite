import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateOrderInput } from '../../graphql.schama';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Connection, QueryRunner } from 'typeorm';
import { Logger } from 'src/logger/logger';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/orderItem.entity';
import { ConfigService } from 'src/config/config.service';
@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    private readonly logger: Logger,
    private configService: ConfigService,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepo: Repository<OrderItemEntity>,
    private readonly connection: Connection,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  async createCheckout(data: CreateOrderInput, customerId: string) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let createOrder: OrderEntity;
    try {
      data.orderItems.forEach((id, index) => {
        line_items.push({
          price_data: {
            currency: 'BDT',
            product_data: {
              name: data.orderItems[index].itemName,
            },
            unit_amount: parseInt(data.orderItems[index].price) * 100,
          },
          quantity: data.orderItems.map((item) => item.quantity)[index],
        });
      });
      const queryRunner = this.connection.createQueryRunner();
      const createOrder = new OrderEntity();
      createOrder.userId = customerId;
      createOrder.payment_status = 'pending';
      createOrder.delivery_status = 'pending';

      await queryRunner.manager.save(OrderEntity, createOrder);

      const orderItems = data.orderItems.map((item) => ({
        order_item_id: item.itemId,
        order_item_name: item.itemName,
        order_item_price: item.price,
        quantity: item.quantity,
        restaurant_id: item.restaurantId,
        order: createOrder, // Assign order relation
      }));

      await queryRunner.manager.save(OrderItemEntity, orderItems);
      const session = await this.stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        success_url: `http://localhost:3000/${customerId}/cart?success=1`,
        cancel_url: `http://localhost:3000/${customerId}/cart?canceled=1`,
        metadata: {
          orderId: createOrder.id,
        },
      });
      return {
        id: session.id,
        url: session.url,
      };

      // create stripe checkout session and return session id and url
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOrdersByUserId(userId: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepo.find({
      where: {
        userId: userId,
      },
    });
    if (!orders) return [];
    return orders;
  }
  async getAllOrders(): Promise<any> {
    const query = this.orderRepo.createQueryBuilder('order');
    query.leftJoinAndSelect('order.orderItem', 'orderItem');
    const orders = await query.getMany();
    const query1 = this.orderItemRepo.createQueryBuilder('orderItem');
    query1.leftJoinAndSelect('orderItem.order', 'order');
    const orderItems = await query1.getMany();
    console.log(orderItems[2].order, 'orderItems');
    if (!orderItems) return [];
    return orderItems;
  }
}
