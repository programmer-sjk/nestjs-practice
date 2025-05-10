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
import { DateUtil } from '../../common/date-util';
import { ChatResponse } from '../dto/chat.response';
import { IChat } from '../interfaces/chat.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatting')
  findAll(@MessageBody() chatting: IChat) {
    const time = DateUtil.now().toFormat('yyyy-mm-dd HH:mm');
    const response = new ChatResponse(chatting.body, time);
    this.server.emit('chatting', response);
  }

  afterInit() {
    console.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }
}
