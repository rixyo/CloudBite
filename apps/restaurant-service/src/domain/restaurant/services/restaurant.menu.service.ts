import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { RestaurantMenuEntity } from '../entity/restaurant.menu.entity';
import { CreateDishInput, CreateMenuInput, UpdateDishInput } from '../../graphql.schama';
import { Logger } from '../../../logger/logger';
import { RestaurantEntity } from '../entity/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Injectable()
export class RestaurantMenuService {
  constructor(
    @InjectRepository(RestaurantMenuEntity)
    private restaurantMenuRepo: Repository<RestaurantMenuEntity>,
    private readonly restaurantService: RestaurantService,
    private logger: Logger,
    private readonly connection: Connection,
  ) {}

  async createMeanu(
    createMeanuInput: CreateMenuInput,
    userId: string,
    id: string,
  ): Promise<RestaurantMenuEntity> {
    const queryRunner = this.connection.createQueryRunner();
    const restaurant = await this.restaurantService.validateAuthorization(
      userId,
      id,
    );
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const category = await this.createUserRestaurantMenu(
        createMeanuInput,
        restaurant,
        queryRunner,
      );
      const menus = await this.restaurantMenuRepo.find({
        where: { restaurant: { id: restaurant.id } },
      });
      await queryRunner.commitTransaction();
      return category;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
  }
  async createUserRestaurantMenu(
    payload: CreateMenuInput,
    restaurant: RestaurantEntity,
    queryRunner: QueryRunner,
  ) {
    return await queryRunner.manager.save(RestaurantMenuEntity, {
      restaurant: restaurant,
      ...payload,
    });
  }
  async getMenues(page: number): Promise<RestaurantMenuEntity[]> {
    const query = this.restaurantMenuRepo.createQueryBuilder('menu');
    query.skip((page - 1) * 10);
    query.take(10);
    const menus = await query
      .leftJoinAndSelect('menu.restaurant', 'restaurant')
      .getMany();
    return menus;
  }
  async getMenu(id: string): Promise<RestaurantMenuEntity> {
    return await this.restaurantMenuRepo.findOne({
      where: { id },
    });
  }
  async deleteMenu(
    id: string,
    restaurantId: string,
    userId: string,
  ): Promise<any> {
    await this.restaurantService.validateAuthorization(userId, restaurantId);
    const dish = await this.getMenu(id);
    if (!dish) {
      throw new NotFoundException(`Menu with this Id not found ${id}`);
    }
    await this.restaurantMenuRepo.delete(id);
    return `Menu with id ${id} deleted successfully`;
  }
}
