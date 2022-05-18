import { IMailRepository } from '../../application/repositories/email-repository';

export class InMemorySendEMailRepository implements IMailRepository {
  emails = [];
  async sendMail(email: string, subject: string, text: string): Promise<void> {
    this.emails.push({
      email,
      subject,
      text,
    });
  }
}
