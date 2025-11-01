import { Email } from '../../domain/email.vo';

export interface EmailSender {
  send(email: Email, subject: string, body: string): void;
}
