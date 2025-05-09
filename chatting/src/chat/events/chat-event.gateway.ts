import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChat } from '../interfaces/chat.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatting')
  findAll(@MessageBody() chatting: IChat) {
    this.server.emit('chatting', chatting.body);
  }

  afterInit() {
    console.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }
}
