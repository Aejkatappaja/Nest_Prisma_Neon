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
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ): void {
    // Business logic to save the message to the database
    // Broadcasting the new message to all connected clients, excluding the sender
    client.broadcast.emit('ping', message);
  }
}
