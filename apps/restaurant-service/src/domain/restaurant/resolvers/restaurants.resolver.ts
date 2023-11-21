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
import { CreateRestaurantInput } from '../../graphql.schama';
import { CreateRestaurantDto } from '../dto/restaurant.dto';
import { validate } from 'class-validator';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Logger } from 'src/logger/logger';
import { RestaurantService } from '../services/restaurants.service';
import { UserInputError } from '@nestjs/apollo';
import { RestaurantOwnerGuard } from '../../auth/guards/restaurant-owner.guard';
@Resolver('Restaurant')
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantService,
    private readonly logger: Logger,
  ) {}

  @Query('restaurants')
  async restaurants(): Promise<RestaurantEntity[]> {
    return [];
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
      const { name, description, address, banner } = createRestaurantInput;
      const createRestaurant = new CreateRestaurantDto();
      createRestaurant.name = name;
      createRestaurant.description = description;
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
      throw new UserInputError(error.message);
    }
  }
  @ResolveField('user')
  user(@Parent() restaurant: RestaurantEntity) {
    this.logger.http('ResolveField::user::HomeResolver' + restaurant.owner_id);
    return { __typename: 'User', id: restaurant.owner_id };
  }
}
