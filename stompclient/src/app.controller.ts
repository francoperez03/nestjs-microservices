import { Controller, Logger, Post, Body, OnModuleInit, Get } from '@nestjs/common';
import { StompJsGateway } from './stompjs/stompjs.gateaway';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  
  constructor(private readonly stompGateway: StompJsGateway) {}
  
  @Post('add')
  sendMessage(@Body() data: string): string {
    this.logger.log('Enviando mensaje por Stomp ' + data);
    return this.stompGateway.send(data);
  }
}
