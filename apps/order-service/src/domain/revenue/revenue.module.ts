import { Module } from '@nestjs/common';
import { LoggerModule } from '../../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/entity/order.entity';
import { OrderItemEntity } from '../order/entity/orderItem.entity';
import { RevenueService } from './revenue.service';
import { RevenueResolver } from './revenue.resolver';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    ConfigModule,
  ],
  providers: [RevenueService, RevenueResolver],
  exports: [],
})
export class RevenueModule {}
