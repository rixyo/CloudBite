import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RestaurantEntity } from '../entity/restaurant.entity';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../../graphql.schama';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
} from '../dto/restaurant.dto';
import { validate } from 'class-validator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Logger } from 'src/logger/logger';
import { RestaurantService } from '../services/restaurants.service';
import { RestaurantOwnerGuard } from '../../auth/guards/restaurant-owner.guard';
@Resolver('Restaurant')
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantService,
    private readonly logger: Logger,
  ) {}

  @Query('restaurants')
  async restaurants(
    @Args('page', { defaultValue: 1 }) page: number,
  ): Promise<RestaurantEntity[]> {
    return await this.restaurantsService.getAllRestaurants(page);
  }
  @Mutation('createRestaurant')
  @UseGuards(RestaurantOwnerGuard)
  async createRestaurant(
    @Args('createRestaurantInput')
    createRestaurantInput: CreateRestaurantInput,
    @Context() context: any,
  ): Promise<RestaurantEntity> {
    try {
      const userId = context.req.headers.userid;
      const { name, address, banner } = createRestaurantInput;
      const createRestaurant = new CreateRestaurantDto();
      createRestaurant.name = name;
      createRestaurant.banner = banner;
      createRestaurant.address = address;
      const errors = await validate(createRestaurant);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      const restaurant = await this.restaurantsService.createRestaurant(
        createRestaurantInput,
        userId,
      );
      return restaurant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Mutation('updateRestaurant')
  @UseGuards(RestaurantOwnerGuard)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<RestaurantEntity> {
    try {
      const { name, banner, delivery_options, pickup_options } =
        updateRestaurantInput;
      const createRestaurant = new UpdateRestaurantDto();
      createRestaurant.name = name;
      createRestaurant.banner = banner;
      createRestaurant.delivery_options = delivery_options;
      createRestaurant.pickup_options = pickup_options;
      const errors = await validate(createRestaurant);
      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      return await this.restaurantsService.updateRestaurant(
        id,
        updateRestaurantInput,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Query('userRestaurants')
  @UseGuards(RestaurantOwnerGuard)
  async userRestaurants(@Context() context: any): Promise<RestaurantEntity[]> {
    try {
      const userId = context.req.headers.userid;
      const restaurants = await this.restaurantsService.getUserRestaurants(
        userId,
      );
      return restaurants;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Query('restaurant')
  async restaurant(@Args('id') id: string): Promise<RestaurantEntity> {
    try {
      const restaurant = await this.restaurantsService.getRestaurantById(id);
      return restaurant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @ResolveField('user')
  user(@Parent() restaurant: RestaurantEntity) {
    this.logger.http(
      'ResolveField::user::RestaurantResolver' + restaurant.owner_id,
    );
    return { __typename: 'User', id: restaurant.owner_id };
  }
}
