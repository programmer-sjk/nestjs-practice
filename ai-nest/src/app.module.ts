import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PromptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
