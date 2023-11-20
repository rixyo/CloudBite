import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [DomainModule, ConfigModule, LoggerModule],
})
export class AppModule {}
