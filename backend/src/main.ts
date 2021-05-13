import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

const logger = new Logger('Backend');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({limit:'50mb'}));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  await app.listen(4000, ()=> logger.log('Backend is listening on port 4000'));
}
bootstrap();
