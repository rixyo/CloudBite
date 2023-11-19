import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { RestaurantEntity } from './entity/restaurant.entity';

@Resolver('Restaurant')
export class RestaurantsResolver {
  constructor() {}

  @Query('restaurants')
  async restaurants(): Promise<RestaurantEntity[]> {
    return [];
  }
  @Mutation('createRestaurant')
  async createRestaurant(): Promise<RestaurantEntity> {
      return null;
  }
}