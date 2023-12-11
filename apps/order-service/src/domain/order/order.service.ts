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
    this.stripe = new Stripe(configService.get().stripe.apiKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  async createCheckout(
    data: CreateOrderInput,
    customerId: string,
    restaurantId: string,
  ) {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let createOrder = null;
    try {
      data.orderItemsIds.forEach((id, index) => {
        line_items.push({
          quantity: data.orderItemsQuantities.find(
            (quantity, index) => data.orderItemsIds[index] === id,
          ),
          price_data: {
            currency: 'BDT',
            product_data: {
              name: data.orderItemsNames[index],
            },
            unit_amount: parseInt(data.orderItemsPrices[index]) * 100,
          },
        });
      });
    } catch (error) {
      throw new Error(error);
    }
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      createOrder = await this.createUserOrder(
        customerId,
        restaurantId,
        queryRunner,
      );
      data.orderItemsIds.forEach(async (id, index) => {
        await this.createOrderItem(
          createOrder.id,
          id,
          data.orderItemsQuantities[index],
          queryRunner,
        );
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }

    // create stripe checkout session and return session id and url
    const session = await this.stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.DEV_CLIENT_URL}/cart?success=1`,
      cancel_url: `${process.env.DEV_CLIENT_URL}/cart?canceled=1`,
      metadata: {
        orderId: createOrder.id,
      },
    });
    return {
      id: session.id,
      url: session.url,
    };
  }
  private async createOrderItem(
    orderId: string,
    menu_item_id: string,
    quantity: number,
    queryRunner: QueryRunner,
  ) {
    return await queryRunner.manager.save(OrderItemEntity, {
      orderId,
      menu_item_id,
      quantity,
    });
  }
  private async createUserOrder(
    userId: string,
    restaurantId: string,
    queryRunner: QueryRunner,
  ) {
    return await queryRunner.manager.save(OrderEntity, {
      userId,
      restaurantId,
      payment_status: 'pending',
      delivery_status: 'pending',
    });
  }
  async getOrdersByUserId(userId: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepo.find({
      where: {
        userId: userId,
      },
      relations: ['orderItems'],
    });
    if (!orders) return [];
    return orders;
  }
}
