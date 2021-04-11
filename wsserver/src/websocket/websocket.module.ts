import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.gateway';
@Module({
    providers: [WebsocketService]
  })
export class WebsocketModule {}
