import { Module, forwardRef } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { LoggerModule } from '../../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './enity/user.entity';
import { ConfigModule } from '../../config/config.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
