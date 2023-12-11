import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entity/order.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
