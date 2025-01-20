import { Injectable } from "@nestjs/common";
import { INotification } from "../interfaces/notification.interface";

@Injectable()
export class PushNotificationService implements INotification {
  async send() {
    // push 알림을 전송한다고 가정
  }
}