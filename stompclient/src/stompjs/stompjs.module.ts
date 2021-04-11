import { Module } from '@nestjs/common';
import { StompJsService } from './stompjs.service'

@Module({
    providers: [StompJsService],
    exports: [StompJsService]
  })
export class StompJsModule {}