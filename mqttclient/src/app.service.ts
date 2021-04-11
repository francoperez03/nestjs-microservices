import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {

  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(
      {
        transport: 3,
        options: {
          url: 'mqtt://localhost:1883',
          qos:2
        },
      }
    )    
  }
  getHello(): string {
    return 'Hello World!';
  }

  sendMessage(data: string) {
    return this.client.send<string,string>('mensaje', data);
  }
}
