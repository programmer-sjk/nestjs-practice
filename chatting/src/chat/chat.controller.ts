import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { ChatService } from './chat.service';
import { AddChatRequest } from './dto/add-chat.request';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':groupId')
  async findAll(@Param('groupId') groupId: number) {
    const chattings = await this.chatService.findAll(groupId);
    return ResponseEntity.OK(chattings);
  }

  @Post()
  async addChat(@Body() request: AddChatRequest) {
    await this.chatService.add(request);
    return ResponseEntity.OK();
  }
}
