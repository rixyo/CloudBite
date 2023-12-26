import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
