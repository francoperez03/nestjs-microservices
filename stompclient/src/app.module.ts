import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StompJsModule } from './stompjs/stompjs.module';

@Module({
  imports: [StompJsModule],
  controllers: [AppController],
  exports: [StompJsModule]
})
export class AppModule {}
