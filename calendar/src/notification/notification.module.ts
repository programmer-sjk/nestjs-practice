import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MailNotificationService } from './services/mail-notification.service';
import { PushNotificationService } from './services/push-notification.service';
import { SmsNotificationService } from './services/sms-notification.service';

@Module({
  providers: [
    NotificationService,
    MailNotificationService,
    SmsNotificationService,
    PushNotificationService,
  ],
})
export class NotificationModule {}
