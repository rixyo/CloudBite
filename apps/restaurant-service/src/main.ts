/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
  Logger.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);
}
bootstrap();
