import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupService } from '../group/group.service';
import { AddChatRequest } from './dto/add-chat.request';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    private readonly groupService: GroupService,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async add(dto: AddChatRequest) {
    await this.groupService.validateUserInGroup(dto.groupId, dto.ownerId);
    const data = new this.chatModel(dto);
    return data.save();
  }

  async findAll(groupId: number) {
    return this.chatModel
      .find({ groupId }, { _id: false })
      .sort({ createdAt: 'asc' })
      .lean();
  }
}
