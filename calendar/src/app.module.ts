import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [UserModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
