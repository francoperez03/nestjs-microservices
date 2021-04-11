import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mensaje')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`El TrOpiCoh: ${context.getTopic()}`);
    console.log(`El mensaje: ${data}`);
    console.log(`El Paquete: ${JSON.stringify(context.getPacket())}`);
    return data;
  }
}
