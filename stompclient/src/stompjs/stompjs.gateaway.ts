import { Injectable, Logger } from "@nestjs/common";
import { Client, Message, Stomp } from '@stomp/stompjs';
// Basado en la documentacion de https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html
// Mejora, pasar esta clase a gateway y hacer una clase de serivico que contenga solo las callbacks de los subscribe()
@Injectable()
export class StompJsGateway {
    private StompClient : Client 
    private static logger = new Logger('StompJSClient');

    private stompConfig = {
        brokerURL: 'ws://localhost:61613',
        connectHeaders: {
          login: 'user',
          passcode: 'password',
        },
        debug: function (str) {
            StompJsGateway.logger.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    }

    constructor() {
        this.StompClient = new Client(this.stompConfig);
        this.StompClient.onConnect = (frame) => {
            //Agregar aqui los subscribe(), ya estas conectado!
            StompJsGateway.logger.log("Se ah realizado la conexion con el broker")

            this.StompClient.subscribe('/message', ()=>{
                StompJsGateway.logger.log("Mensaje recibido desde al ActiveMQ Artemis")
            });
        };
        
        this.StompClient.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            StompJsGateway.logger.log('Broker reported error: ' + frame.headers['message']);
            StompJsGateway.logger.log('Additional details: ' + frame.body);
        };
        this.StompClient.activate();
    }
 
    send(data: any): string {
        this.waitForSocketConnection(this.StompClient, () => {
            StompJsGateway.logger.log("enviando! " + data);
            this.StompClient.publish({
                destination: '/message',
                body: data,
                skipContentLengthHeader: true,
              });
        });
        return data
    }

    waitForSocketConnection(StompClient : Client, callback){
        setTimeout(
            () => {
                if (StompClient.webSocket.readyState === 1) {
                    StompJsGateway.logger.log("Connection is made")
                    if (callback != null){
                        callback();
                    }
                } else {
                    StompJsGateway.logger.log("wait for connection...")
                    this.waitForSocketConnection(StompClient, callback);
                }
            }, 5);
    }

}