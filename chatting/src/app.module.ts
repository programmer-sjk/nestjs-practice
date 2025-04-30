import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { ChatModule } from './chat/chat.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    GroupModule,
    ChatModule,
  ],
})
export class AppModule {}
