import { Module } from '@nestjs/common';
import { LoggerModule } from '../../logger/logger.module';
import { AuthModule } from '../auth/auth.module';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/orderItem.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    AuthModule,
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
