import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { RestaurantEntity } from '../entity/restaurant.entity';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../../graphql.schama';
import { Logger } from '../../../logger/logger';
import { AddressDto } from '../dto/restaurant.dto';
import { RestaurantAddressEntity } from '../entity/restaurant.address.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantAddressEntity)
    private restaurantAddressRepo: Repository<RestaurantAddressEntity>,
    private logger: Logger,
    private readonly connection: Connection,
  ) {}
  /**
   * Gets all the users that are registered
   *
   * @returns {Promise<RestaurantEntity[]>}
   * @memberof RestaurantsService
   */
  // create restaurant method is used to create a restaurant and its address
  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
    userid: string,
  ): Promise<RestaurantEntity> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const restaurant = await this.CreateUserRestaurant(
        createRestaurantInput,
        userid,
        queryRunner,
      );
      await this.createAddress(
        createRestaurantInput.address,
        restaurant,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      this.logger.log('Restaurant created successfully');
      return restaurant;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
  // create CreateUserRestaurant method is used to create a restaurant
  async CreateUserRestaurant(
    createRestaurantInput: CreateRestaurantInput,
    userid: string,
    queryRunner: QueryRunner,
  ): Promise<RestaurantEntity> {
    return await queryRunner.manager.save(RestaurantEntity, {
      ...createRestaurantInput,
      owner_id: userid,
    });
  }
  // create address method is used to create a address
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
  // get User Restaurant method is used to get a restaurant by user id
  async getUserRestaurants(userid: string): Promise<RestaurantEntity[]> {
    const restaurnt = await this.restaurantRepo.find({
      where: { owner_id: userid },
    });
    if (!restaurnt) throw new Error('No restaurant found');
    return restaurnt;
  }
  async updateRestaurant(
    id: string,
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<RestaurantEntity> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.where('restaurant.id = :id', { id: id });
    const restaurant = await query.getOne();
    if (!restaurant) throw new Error('No restaurant found');
    restaurant.name = updateRestaurantInput.name;
    restaurant.banner = updateRestaurantInput.banner;
    restaurant.delivery_options = updateRestaurantInput.delivery_options;
    restaurant.pickup_options = updateRestaurantInput.pickup_options;
    await this.restaurantRepo.save(restaurant);
    return restaurant;
  }
  async getAllRestaurants(page: number): Promise<RestaurantEntity[]> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.skip((page - 1) * 10);
    query.leftJoinAndSelect('restaurant.address', 'address');
    const restaurents = await query.take(10).getMany();
    if (!restaurents) return [];
    console.log(restaurents);
    return restaurents;
  }
  async validateAuthorization(
    userId: string,
    restaurantId: string,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException(
        `restaurant with this Id not found ${restaurantId}`,
      );
    }
    if (restaurant.owner_id !== userId) {
      throw new Error('You are not authorized to perform this action');
    }
    return restaurant;
  }
  async getRestaurantById(id: string): Promise<RestaurantEntity> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.where('restaurant.id = :id', { id: id });
    query.leftJoinAndSelect('restaurant.address', 'address');
    const restaurant = await query.getOne();
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    return restaurant;
  }
  async getRestaurantsByAddress(page: number, search: string): Promise<any> {
    const query = this.restaurantAddressRepo.createQueryBuilder('address');
    console.log(search);
    query.skip((page - 1) * 10);
    query.where(
      'LOWER(address.city) LIKE LOWER(:city) OR LOWER(address.street) LIKE LOWER(:street) OR LOWER(address.country) LIKE LOWER(:country) OR LOWER(address.state) LIKE LOWER(:state)',
      {
        city: search,
        street: search,
        country: search,
        state: search,
      },
    );
    query
      .leftJoinAndSelect('address.restaurant', 'restaurant')
      .select([
        'address.id',
        'restaurant.id',
        'restaurant.name',
        'restaurant.banner',
        'restaurant.delivery_options',
        'restaurant.pickup_options',
      ]);
    const restaurants = await query.take(10).getMany();
    if (!restaurants) return [];
    return restaurants;
  }
  async deleteRestaurant(id: string): Promise<RestaurantEntity> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.where('restaurant.id = :id', { id: id });
    const restaurant = await query.getOne();
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    const restaurantDelete = await this.restaurantRepo.delete(id);
    if (restaurantDelete.affected === 0) {
      throw new Error('Restaurant not deleted');
    }
    return restaurant;
  }
  async getRestaurantByName(name: string): Promise<RestaurantEntity> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.where('restaurant.name = :name', { name: name });
    const restaurant = await query.getOne();
    if (!restaurant) {
      throw new NotFoundException(
        `restaurant with this name not found ${name}`,
      );
    }
    return restaurant;
  }
  async getRestaurantsByIds(ids: string[]): Promise<RestaurantEntity[]> {
    const query = this.restaurantRepo.createQueryBuilder('restaurant');
    query.where('restaurant.id IN (:...ids)', { ids });
    query.leftJoinAndSelect('restaurant.address', 'address');
    const restaurants = await query.getMany();

    if (!restaurants || restaurants.length === 0) {
      throw new NotFoundException(`No restaurants found with the provided IDs`);
    }

    return restaurants;
  }
  private evaluateDBError(
    error: Error,
    createRestaurantInput: CreateRestaurantInput,
  ): Error {
    throw new Error(`Name ${createRestaurantInput.name} is already registered`);
  }
}
