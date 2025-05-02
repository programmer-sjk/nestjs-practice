import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  groupId: number;

  @Prop()
  ownerId: number;

  @Prop()
  body: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
