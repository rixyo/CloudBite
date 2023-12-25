import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/logger/logger.module';
import { WithdrawEntity } from './entity/withdraw.entity';
import { SecretkeyEntity } from './entity/secretkey.entity';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    TypeOrmModule.forFeature([WithdrawEntity, SecretkeyEntity]),
  ],
  providers: [ApplicationService, ApplicationResolver],
  exports: [],
})
export class ApplicationModule {}
