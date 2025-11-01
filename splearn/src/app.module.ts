import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/domain/member.entity';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Member],
    }),
    MemberModule,
  ],
})
export class AppModule {}
