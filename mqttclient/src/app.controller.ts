import { Controller, Logger, Post, Body, OnModuleInit, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('GET received');
    return this.appService.getHello();
  }
  
  @Post('add')
  async sendMessage(@Body('data') data: string)  {
    this.logger.log('Envianding ' + data);
    return this.appService.sendMessage(data);  // <-- Change this
  }
}
