import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from '../group/group.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EventsGateway } from './events/chat.gateway';
import { Chat, ChatSchema } from './schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    GroupModule,
  ],
  providers: [ChatService, EventsGateway],
  controllers: [ChatController],
})
export class ChatModule {}
