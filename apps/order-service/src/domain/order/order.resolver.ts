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
  // @UseGuards(JwtAuthGuard)
  async orders(@Context() context: any): Promise<any> {
    const userId = context.req.headers.userid;
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

  @ResolveField('users')
  user(@Parent() order: OrderEntity) {
    this.logger.http('ResolveField::user::OrderResolver' + order.userId);
    return { __typename: 'User', id: order.userId };
  }
}
