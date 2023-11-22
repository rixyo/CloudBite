import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { RestaurantDishEntity } from '../entity/restaurant.dish.entity';
import { CreateDishInput, UpdateDishInput } from '../../graphql.schama';
import { Logger } from '../../../logger/logger';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Injectable()
export class RestaurantDishService {
  constructor(
    @InjectRepository(RestaurantDishEntity)
    @InjectRepository(RestaurantEntity)
    private restaurantDishRepo: Repository<RestaurantDishEntity>,
    private readonly restaurantService: RestaurantService,
    private logger: Logger,
    private readonly connection: Connection,
  ) {}

  async createDish(
    createDishInput: CreateDishInput,
    userId: string,
    id: string,
  ): Promise<RestaurantDishEntity> {
    const queryRunner = this.connection.createQueryRunner();
    const restaurant = await this.restaurantService.validateAuthorization(
      userId,
      id,
    );
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const dish = await this.createUserRestaurantDish(
        createDishInput,
        restaurant,
        queryRunner,
      );
      const menus = await this.restaurantDishRepo.find({
        where: { restaurant: { id: restaurant.id } },
      });
      await queryRunner.commitTransaction();
      return dish;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
  async createUserRestaurantDish(
    payload: CreateDishInput,
    restaurant: RestaurantEntity,
    queryRunner: QueryRunner,
  ) {
    return await queryRunner.manager.save(RestaurantDishEntity, {
      restaurant: restaurant,
      ...payload,
    });
  }
  async getDishes(page: number): Promise<RestaurantDishEntity[]> {
    const query = this.restaurantDishRepo.createQueryBuilder('dish');
    query.skip((page - 1) * 10);
    query.take(10);
    const dishes = await query.getMany();
    return dishes;
  }
  async getDish(id: string): Promise<RestaurantDishEntity> {
    return await this.restaurantDishRepo.findOne({
      where: { id },
    });
  }
  async getAllDishByRestaurant(id: string, page: number): Promise<any> {
    const restaurant = await this.restaurantService.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    const query = this.restaurantDishRepo.createQueryBuilder('dish');
    query.skip((page - 1) * 10);
    query.take(10);
    query.where('dish.restaurant = :id', { id: id });
    const dishes = await query.getMany();
    return {
      dishes,
      restaurant,
    };
  }
}
