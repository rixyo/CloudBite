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
      await this.restaurantDishRepo.find({
        where: { restaurant: { id: restaurant.id } },
      });
      await queryRunner.commitTransaction();
      this.logger.log(
        `Dish created successfully dish ID${dish.id}, restaurant ID ${restaurant.id}`,
      );
      return dish;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Error creating dish dish , restaurant ID ${restaurant.id}`,
      );
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
    const dishes = await query
      .leftJoinAndSelect('dish.restaurant', 'restaurant')
      .getMany();
    return dishes;
  }
  async getDish(id: string): Promise<RestaurantDishEntity> {
    return await this.restaurantDishRepo.findOne({
      where: { id },
    });
  }
  async getAllDishByRestaurant(
    id: string,
    page: number,
  ): Promise<RestaurantDishEntity[]> {
    const restaurant = await this.restaurantService.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    const query = this.restaurantDishRepo.createQueryBuilder('dish');
    query.skip((page - 1) * 10);
    query.take(10);
    const dishes = await query
      .leftJoinAndSelect('dish.restaurant', 'restaurant')
      .where('restaurant.id = :id', { id })
      .getMany();
    return dishes;
  }
  async updateDish(
    userId: string,
    dishId: string,
    restaurantId: string,
    updateDishInput: UpdateDishInput,
  ): Promise<RestaurantDishEntity> {
    await this.restaurantService.validateAuthorization(userId, restaurantId);
    const dish = await this.getDish(dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with this Id not found ${dishId}`);
    }
    dish.name = updateDishInput.name;
    dish.description = updateDishInput.description;
    dish.price = updateDishInput.price;
    dish.thumbnails = updateDishInput.thumbnails;
    await this.restaurantDishRepo.save(dish);
    this.logger.log(
      `Dish updated successfully dish ID${dish.id}, restaurant ID ${restaurantId}`,
    );
    return dish;
  }
  async deleteDish(
    id: string,
    restaurantId: string,
    userId: string,
  ): Promise<any> {
    await this.restaurantService.validateAuthorization(userId, restaurantId);
    const dish = await this.getDish(id);
    if (!dish) {
      throw new NotFoundException(`Dish with this Id not found ${id}`);
    }
    await this.restaurantDishRepo.delete(id);
    return `Dish with id ${id} deleted successfully`;
  }
}
