import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatting')
  findAll(@MessageBody() data: any) {
    this.server.emit('chatting', data);
  }

  afterInit() {
    console.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }
}
