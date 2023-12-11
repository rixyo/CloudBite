import { ApolloFederationDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { OrderEntity } from './order/entity/order.entity';
import { OrderItemEntity } from './order/entity/orderItem.entity';
import { OrderModule } from './order/order.module';
import { WebhookModule } from './order/webhook/webhook.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./src/**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            ((
              error.extensions?.exception as {
                response?: { message: string };
              }
            )?.response?.message as string) || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    DbModule.forRoot({
      entities: [OrderEntity, OrderItemEntity],
    }),

    ConfigModule,
    LoggerModule,
    OrderModule,
    WebhookModule,
  ],
})
export class DomainModule {}
