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

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    console.log(data);
    return data;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data);
    return data;
  }

  afterInit() {
    console.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client, args);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }
}
