import { ApolloFederationDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DbModule } from '../db/db.module';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { SecretkeyEntity } from './application/entity/secretkey.entity';
import { WithdrawEntity } from './application/entity/withdraw.entity';
import { ApplicationModule } from './application/application.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./src/**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    DbModule.forRoot({
      entities: [SecretkeyEntity, WithdrawEntity],
    }),
    ApplicationModule,
    AuthModule,
    ConfigModule,
    LoggerModule,
  ],
})
export class DomainModule {}
