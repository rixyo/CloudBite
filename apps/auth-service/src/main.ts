// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
process.env.DEBUG = 'qapi:*';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors({
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
  Logger.log(`🚀 Auth Server ready at PORT ${process.env.PORT}`);
}
bootstrap();
