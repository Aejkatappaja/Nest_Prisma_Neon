import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ): void {
    this.logger.log(`Message received from client id: ${client.id}`);
    // Business logic to save the message to the database
    // Broadcasting the new message to all connected clients, excluding the sender
    client.broadcast.emit('ping', message);
  }
}
