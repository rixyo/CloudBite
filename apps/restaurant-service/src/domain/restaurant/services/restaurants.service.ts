import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Connection, QueryRunner } from 'typeorm';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { CreateRestaurantInput } from '../../graphql.schama';
import { Logger } from '../../../logger/logger';
import { AddressDto } from '../dto/restaurant.dto';
import { RestaurantAddressEntity } from '../entity/restaurant.address.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    private logger: Logger,
    private readonly connection: Connection,
  ) {}
  /**
   * Gets all the users that are registered
   *
   * @returns {Promise<RestaurantEntity[]>}
   * @memberof RestaurantsService
   */
  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
    userid: string,
  ): Promise<RestaurantEntity> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      console.log(userid,'service restaurant');
      const restaurant = await this.CreateUserRestaurant(
        createRestaurantInput,
        userid,
        queryRunner,
      );
      console.log(restaurant,'service restaurant');
      const address = await this.createAddress(
        createRestaurantInput.address,
        restaurant,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return restaurant;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
  async CreateUserRestaurant(
    createRestaurantInput: CreateRestaurantInput,
    userid: string,
    queryRunner: QueryRunner,
  ): Promise<RestaurantEntity> {
    console.log(userid);
    return await queryRunner.manager.save(RestaurantEntity, {
      ...createRestaurantInput,
      owner_id: userid,
    });
  }
  async createAddress(
    address: AddressDto,
    restaurant: RestaurantEntity,
    queryRunner: QueryRunner,
  ): Promise<RestaurantAddressEntity> {
    return await queryRunner.manager.save(RestaurantAddressEntity, {
      ...address,
      restaurant: restaurant,
    });
  }
  private evaluateDBError(
    error: Error,
    createRestaurantInput: CreateRestaurantInput,
  ): Error {
    throw new Error(`Name ${createRestaurantInput.name} is already registered`);
  }
}
