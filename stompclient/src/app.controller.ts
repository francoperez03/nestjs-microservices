import { Controller, Logger, Post, Body, OnModuleInit, Get } from '@nestjs/common';
import { StompJsService } from './stompjs/stompjs.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  
  constructor(private readonly stompService: StompJsService) {}
  
  @Post('add')
  async sendMessage(@Body() data: string)  {
    this.logger.log('Enviando mensaje por Stomp ' + data);
    return this.stompService.send(data);
  }
}
