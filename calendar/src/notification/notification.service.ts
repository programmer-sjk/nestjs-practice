import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationType } from './enums/notification-type.enum';
import { MailNotificationService } from './services/mail-notification.service';
import { PushNotificationService } from './services/push-notification.service';
import { SmsNotificationService } from './services/sms-notification.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly smsNotificationService: SmsNotificationService,
    private readonly mailNotificationService: MailNotificationService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async sendNotification(type: NotificationType) {
    const notificationService = this.getNotificationServiceByType(type);
    await notificationService.send();
  }

  getNotificationServiceByType(type: NotificationType) {
    switch (type) {
      case NotificationType.SMS:
        return this.smsNotificationService;
      case NotificationType.MAIL:
        return this.mailNotificationService;
      case NotificationType.PUSH:
        return this.pushNotificationService;
      default:
        throw new BadRequestException('잘못된 알림 타입입니다.');
    }
  }
}
