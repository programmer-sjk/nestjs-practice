import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { ChatService } from './chat.service';
import { AddChatRequest } from './dto/add-chat.request';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async addChat(@Body() request: AddChatRequest) {
    await this.chatService.add(request)
    return ResponseEntity.OK();
  } 
}
