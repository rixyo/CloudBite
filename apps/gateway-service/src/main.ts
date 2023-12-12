// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  app.enableCors({
    origin: allowOrigins,
    credentials: true,
  });
  await app.listen(process.env.PORT || 5002);
  Logger.log(
    `🚀 Gateway Server ready at http://localhost:${process.env.PORT}/graphql`,
  );
}
bootstrap();
