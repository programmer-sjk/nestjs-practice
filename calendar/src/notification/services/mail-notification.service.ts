import { Injectable } from "@nestjs/common";
import { INotification } from "../interfaces/notification.interface";

@Injectable()
export class MailNotificationService implements INotification {
  async send() {
    // mail 알림을 전송한다고 가정
  }
}