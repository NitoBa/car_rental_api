import { ISendEMailRepository } from '../../application/repositories/isend-email-repository';

export class SendEmailRepository implements ISendEMailRepository {
  async sendMail(email: string, subject: string, text: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
