import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DbModule } from '../db/db.module';
import { UserEntity } from './users/enity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    DbModule.forRoot({
      entities: [UserEntity],
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
    LoggerModule,
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class DomainModule {}
