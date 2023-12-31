import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveReference,
} from '@nestjs/graphql';
import { CreateDishInput, UpdateDishInput } from '../../graphql.schama';
import { CreateRestaurantDishDto } from '../dto/restaurant.dish.dto';
import { validate } from 'class-validator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Logger } from 'src/logger/logger';
import { RestaurantOwnerGuard } from '../../auth/guards/restaurant-owner.guard';
import { RestaurantDishService } from '../services/restaurant.dish.service';
import { RestaurantDishEntity } from '../entity/restaurant.dish.entity';

@Resolver('RestaurantDish')
export class RestaurantDishResolver {
  constructor(
    private readonly restauranDishService: RestaurantDishService,
    private readonly logger: Logger,
  ) {}
  @Query('restaurantDishes')
  async RestaurantDishes(
    @Args('restaurantId') id: string,
    @Args('page', { defaultValue: 1 }) page: number,
  ): Promise<any> {
    return await this.restauranDishService.getAllDishByRestaurant(id, page);
  }
  @Mutation('createDish')
  @UseGuards(RestaurantOwnerGuard)
  async createRestaurantDish(
    @Context() context: any,
    @Args('createDishInput') createDishInput: CreateDishInput,
    @Args('id') id: string,
  ): Promise<RestaurantDishEntity> {
    try {
      const userId = context.req.headers.userid;
      const { name, description, price, thumbnails, dish_type } =
        createDishInput;
      const createRestaurantDish = new CreateRestaurantDishDto();
      createRestaurantDish.name = name;
      createRestaurantDish.description = description;
      createRestaurantDish.price = price;
      createRestaurantDish.thumbnails = thumbnails;
      createRestaurantDish.dish_type = dish_type;
      const errors = await validate(createRestaurantDish);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      const dish = await this.restauranDishService.createDish(
        createDishInput,
        userId,
        id,
      );
      return dish;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Query('dish')
  async Dish(@Args('id') id: string): Promise<RestaurantDishEntity> {
    return await this.restauranDishService.getDish(id);
  }
  @Query('dishes')
  async Disheshes(
    @Args('page', { defaultValue: 1 }) page: number,
  ): Promise<RestaurantDishEntity[]> {
    return await this.restauranDishService.getDishes(page);
  }
  @Mutation('updateDish')
  @UseGuards(RestaurantOwnerGuard)
  async updateRestaurant(
    @Args('restaurantId') restaurantId: string,
    @Args('dishId') id: string,
    @Context() context: any,
    @Args('updateDishInput') updateDishInput: UpdateDishInput,
  ): Promise<RestaurantDishEntity> {
    try {
      const userId = context.req.headers.userid;
      if (!userId) throw new BadRequestException('Unauthorized');
      const { name, description, price, thumbnails, dish_type } =
        updateDishInput;
      const createRestaurantDish = new CreateRestaurantDishDto();
      createRestaurantDish.name = name;
      createRestaurantDish.description = description;
      createRestaurantDish.price = price;
      createRestaurantDish.thumbnails = thumbnails;
      createRestaurantDish.dish_type = dish_type;
      const errors = await validate(createRestaurantDish);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      const dish = await this.restauranDishService.updateDish(
        userId,
        id,
        restaurantId,
        updateDishInput,
      );
      return dish;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Mutation('deleteDish')
  @UseGuards(RestaurantOwnerGuard)
  async deleteDish(
    @Args('id') id: string,
    @Args('restaurantId') restaurantId: string,
    @Context() context: any,
  ): Promise<any> {
    try {
      const userId = context.req.headers.userid;
      if (!userId) throw new BadRequestException('Unauthorized');
      await this.restauranDishService.deleteDish(id, restaurantId, userId);
      return { message: 'Dish deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<RestaurantDishEntity> {
    this.logger.http('ResolveReference :: restaurantDish');
    return await this.restauranDishService.getDish(reference.id);
  }
}
