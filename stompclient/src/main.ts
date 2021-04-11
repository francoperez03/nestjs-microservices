import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
(global as any).WebSocket = require('ws');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
