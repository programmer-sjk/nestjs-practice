import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../src/notification/notification.service';
import { MailNotificationService } from '../../src/notification/services/mail-notification.service';
import { PushNotificationService } from '../../src/notification/services/push-notification.service';
import { SmsNotificationService } from '../../src/notification/services/sms-notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        SmsNotificationService,
        MailNotificationService,
        PushNotificationService,
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
