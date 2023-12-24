import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../order/entity/orderItem.entity';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>, // though we don't need this repo, but we need to inject it to use the orderItemRepo
    @InjectRepository(OrderItemEntity)
    private orderItemRepo: Repository<OrderItemEntity>,
  ) {}
  async revenue(restaurantId: string): Promise<any> {
    const query = this.orderItemRepo.createQueryBuilder('orderItem');
    query.innerJoinAndSelect('orderItem.order', 'order');
    query.where('orderItem.restaurant_id = :restaurantId', { restaurantId });
    query.andWhere('order.payment_status = :payment_status', {
      payment_status: 'completed',
    });
    query.select(
      "SUM(COALESCE(CAST(NULLIF(orderItem.order_item_price, '') AS NUMERIC), 0) * COALESCE(orderItem.quantity, 0))",
      'total_revenue',
    );
    const result = await query.getRawOne();
    if (!result) return { total_revenue: 0 };
    return result;
  }
  async currentMonthRevenue(restaurantId: string): Promise<any> {
    const query = this.orderItemRepo.createQueryBuilder('orderItem');
    query.innerJoinAndSelect('orderItem.order', 'order');
    query.where('orderItem.restaurant_id = :restaurantId', { restaurantId });
    query.andWhere('order.payment_status = :payment_status', {
      payment_status: 'completed',
    });
    query.andWhere(
      'EXTRACT(MONTH FROM order.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE)',
    );
    query.select(
      "SUM(COALESCE(CAST(NULLIF(orderItem.order_item_price, '') AS NUMERIC), 0) * COALESCE(orderItem.quantity, 0))",
      'total_revenue',
    );
    query.groupBy('orderItem.restaurant_id');
    const result = await query.getRawOne();
    return result;
  }
  async previousMonthRevenue(restaurantId: string): Promise<any> {
    const query = this.orderItemRepo.createQueryBuilder('orderItem');
    query.innerJoinAndSelect('orderItem.order', 'order');
    query.where('orderItem.restaurant_id = :restaurantId', { restaurantId });
    query.andWhere('order.payment_status = :payment_status', {
      payment_status: 'completed',
    });
    query.andWhere(
      "EXTRACT(MONTH FROM order.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')",
    );
    query.select(
      "SUM(COALESCE(CAST(NULLIF(orderItem.order_item_price, '') AS NUMERIC), 0) * COALESCE(orderItem.quantity, 0))",
      'total_revenue',
    );
    const result = await query.getRawOne();
    return result;
  }
}
