import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveField,
  Parent,
  ResolveReference,
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

@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly logger: Logger,
    private readonly orderServ: OrderService,
  ) {}
  @Query('orders')
  @UseGuards(JwtAuthGuard)
  async orders(@Context() context: any): Promise<OrderEntity[]> {
    const userId = context.req.headers.userid;
    return await this.orderServ.getOrdersByUserId(userId);
  }
  @Mutation('checkout')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context: any,
    @Args('restaurantId') restaurantId: string,
  ): Promise<any> {
    try {
      const userId = context.req.headers.userid;
      const {
        orderItemsIds,
        orderItemsNames,
        orderItemsPrices,
        orderItemsQuantities,
      } = createOrderInput;
      const createOrder = new CreateCheckoutDto();
      createOrder.orderItemsIds = orderItemsIds;
      createOrder.orderItemsNames = orderItemsNames;
      createOrder.orderItemsPrices = orderItemsPrices;
      createOrder.orderItemsQuantities = orderItemsQuantities;
      const errors = await validate(createOrder);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      return await this.orderServ.createCheckout(
        createOrder,
        userId,
        restaurantId,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @ResolveField('user')
  user(@Parent() order: OrderEntity) {
    this.logger.http('ResolveField::user::OrderResolver' + order.userId);
    return { __typename: 'User', id: order.userId };
  }
  @ResolveField('restaurant')
  restaurant(@Parent() order: OrderEntity) {
    this.logger.http(
      'ResolveField::restaurant::OrderResolver' + order.restaurantId,
    );
    return { __typename: 'Restaurant', id: order.restaurantId };
  }
  @ResolveField('restaurant')
  dishes(@Parent() orderItem: OrderItemEntity) {
    this.logger.http(
      'ResolveField::restaurant_dish::OrderResolver' + orderItem.menu_item_id,
    );
    return { __typename: 'Restaurant', id: orderItem.menu_item_id };
  }
}
