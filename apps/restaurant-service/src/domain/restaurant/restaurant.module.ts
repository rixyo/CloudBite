import { Module } from '@nestjs/common';
import { LoggerModule } from '../../logger/logger.module';
import { AuthModule } from '../auth/auth.module';
import { RestaurantsResolver } from './resolvers/restaurants.resolver';
import { RestaurantService } from './services/restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entity/restaurant.entity';
import { ConfigModule } from 'src/config/config.module';
import { RestaurantAddressEntity } from './entity/restaurant.address.entity';
import { RestaurantDishResolver } from './resolvers/restauant.dish.resolver';
import { RestaurantDishService } from './services/restaurant.dish.service';
import { RestaurantDishEntity } from './entity/restaurant.dish.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    AuthModule,
    TypeOrmModule.forFeature([
      RestaurantEntity,
      RestaurantDishEntity,
      RestaurantAddressEntity,
    ]),
  ],
  providers: [
    RestaurantsResolver,
    RestaurantService,
    RestaurantDishResolver,
    RestaurantDishService,
  ],
  exports: [RestaurantService, RestaurantDishService],
})
export class RestaurantModule {}
