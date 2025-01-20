import { Injectable } from "@nestjs/common";
import { INotification } from "../interfaces/notification.interface";

@Injectable()
export class PushNotificationService implements INotification {
  async send(userIds: number[]) {
    // push 알림을 전송한다고 가정
  }
}