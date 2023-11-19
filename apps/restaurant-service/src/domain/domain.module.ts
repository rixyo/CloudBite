import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { RestaurantAddressEntity } from './restaurant/entity/restaurant.address.entity';
import { RestaurantEntity } from './restaurant/entity/restaurant.entity';
import { RestaurantDishEntity } from './restaurant/entity/restaurant.dish.entity';
import { RestaurantsResolver } from './restaurant/restaurants.resolver';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      uploads: false,
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            ((error.extensions?.exception as { response?: { message: string } })
              ?.response?.message as string) || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    DbModule.forRoot({
      entities: [
        RestaurantEntity,
        RestaurantAddressEntity,
        RestaurantDishEntity,
      ],
    }),

    ConfigModule,
    LoggerModule,
  ],
  controllers: [],
  exports: [],
  providers: [RestaurantsResolver],
})
export class DomainModule {}
