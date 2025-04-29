import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), UserModule, GroupModule, ChatModule],
})
export class AppModule {}
