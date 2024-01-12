/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  await app.listen(process.env.PORT || 3002);
  Logger.log(
    `🚀 Restaurant Server ready at http://localhost:${process.env.PORT}/graphql`,
  );
}
bootstrap();
