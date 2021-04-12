import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { StompJsModule } from './stompjs/stompjs.module';
(global as any).WebSocket = require('ws');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[StompJsModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Deberia devolver \"Enviado por Stomp\""', () => {
      expect(appController.sendMessage(
        "{ \"event\" : \"message\", \"data\" : \" ejemplo \"}"
      )).toBe("{ \"event\" : \"message\", \"data\" : \" ejemplo \"}");
    });
  });
});
