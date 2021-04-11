import { Injectable, Logger } from "@nestjs/common";
import { Client, Message, Stomp } from '@stomp/stompjs';
// Basado en la documentacion de https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html
// Mejora, pasar esta clase a gateway y hacer una clase de serivico que contenga solo las callbacks de los subscribe()
@Injectable()
export class StompJsService {
    private StompClient : Client 
    private static logger = new Logger('StompJSClient');

    private stompConfig = {
        brokerURL: 'ws://localhost:61613',
        connectHeaders: {
          login: 'user',
          passcode: 'password',
        },
        debug: function (str) {
            StompJsService.logger.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }

    constructor() {
        this.StompClient = new Client(this.stompConfig);
        this.StompClient.onConnect = (frame) => {
            //Agregar aqui los subscribe(), ya estas conectado!
            StompJsService.logger.log("Se ah realizado la conexion con el broker")

            this.StompClient.subscribe('/message', ()=>{
                StompJsService.logger.log("Mensaje recibido desde al ActiveMQ Artemis")
            });
        };
        
        this.StompClient.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        this.StompClient.activate();
    }

    send(data: any): string {
        StompJsService.logger.log("enviando! " + data);
        this.StompClient.publish({
            destination: '/message',
            body: 'Hello world',
            skipContentLengthHeader: true,
          });
        return "Enviado por Stomp"
    }

}