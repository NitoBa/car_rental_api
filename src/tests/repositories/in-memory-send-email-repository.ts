import { ISendEMailRepository } from '../../application/repositories/isend-email-repository';

export class InMemorySendEMailRepository implements ISendEMailRepository {
  emails = [];
  async sendMail(email: string, subject: string, text: string): Promise<void> {
    this.emails.push({
      email,
      subject,
      text,
    });
  }
}
