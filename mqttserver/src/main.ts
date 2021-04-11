import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

const microserviceOptions = {
  transport: Transport.MQTT,
  options: {
     url: 'mqtt://localhost:1883',
     qos: 2
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  app.listen(() => {
    logger.log('Mqtt is listening...');
  });
}
bootstrap();