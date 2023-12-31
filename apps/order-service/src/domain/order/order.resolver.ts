import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { OrderEntity } from './entity/order.entity';

import { CreateOrderInput } from '../../graphql.schama';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { CreateCheckoutDto } from './dto/checkout.dto';

import { validate } from 'class-validator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Logger } from 'src/logger/logger';
import { OrderItemEntity } from './entity/orderItem.entity';
import { OrderService } from './order.service';
import { RestaurantOwnerGuard } from '../auth/guards/restaurant-owner.guard';

@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly logger: Logger,
    private readonly orderServ: OrderService,
  ) {}
  @Query('orders')
  @UseGuards(RestaurantOwnerGuard)
  async orders(): Promise<any> {
    return await this.orderServ.getAllOrders();
  }
  @Mutation('checkout')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context: any,
  ): Promise<any> {
    try {
      const userId = context.req.headers.userid;
      const { orderItems } = createOrderInput;
      const createOrder = new CreateCheckoutDto();
      createOrder.orderItems = orderItems;
      const errors = await validate(createOrder);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      return await this.orderServ.createCheckout(createOrder, userId);
    } catch (error) {
      throw new Error(error);
    }
  }
  @Mutation('deleteOrder')
  @UseGuards(RestaurantOwnerGuard)
  async deleteOrder(@Args('id') orderId: string): Promise<OrderEntity> {
    return await this.orderServ.deleteOrder(orderId);
  }
  @Query('getRestaurantOrders')
  @UseGuards(RestaurantOwnerGuard)
  async getRestaurantOrders(
    @Args('restaurantId') restaurantId: string,
  ): Promise<any> {
    return await this.orderServ.getOrdersByRestaurantId(restaurantId);
  }
  @Query('order')
  @UseGuards(RestaurantOwnerGuard)
  async getOrderByOrderId(@Args('id') orderId: string): Promise<any> {
    return await this.orderServ.getOrderByOrderId(orderId);
  }
  @Query('getUserOrders')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Context() context: any): Promise<any> {
    const userId = context.req.headers.userid;
    return await this.orderServ.getUserOrders(userId);
  }
  @ResolveField('user')
  user(@Parent() order: OrderEntity) {
    this.logger.http('ResolveField::user::OrderResolver' + order.userId);
    return { __typename: 'User', id: order.userId };
  }
  @ResolveField('restaurant')
  restaurant(@Parent() orderItem: OrderItemEntity) {
    console.log(`orderItem ${orderItem.restaurant_id}`);
    this.logger.http(
      'ResolveField::restaurant::OrderResolver' + orderItem.restaurant_id,
    );
    return { __typename: 'Restaurant', id: orderItem.restaurant_id };
  }
  @ResolveField('dish')
  dish(@Parent() orderItem: OrderItemEntity) {
    this.logger.http(
      'ResolveField::dish::OrderResolver' + orderItem.order_item_id,
    );
    return { __typename: 'RestaurantDish', id: orderItem.order_item_id };
  }
}
