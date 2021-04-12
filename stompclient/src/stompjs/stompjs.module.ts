import { Module } from '@nestjs/common';
import { StompJsGateway } from './stompjs.gateaway'

@Module({
    providers: [StompJsGateway],
    exports: [StompJsGateway]
  })
export class StompJsModule {}