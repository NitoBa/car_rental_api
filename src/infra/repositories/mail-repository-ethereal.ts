import nodemailer, { Transporter } from 'nodemailer';

import { IMailRepository } from '../../application/repositories/email-repository';

export class MailRepositoryEthereal implements IMailRepository {
  private transporter: Transporter;
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  async sendMail(email: string, subject: string, text: string): Promise<void> {
    try {
      const response = await this.transporter.sendMail({
        from: 'CarRentalTeam <norelay@rental.com>',
        to: email,
        subject,
        html: text,
      });

      console.log('Message sent: %s', response.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
    } catch (error) {
      throw new Error(error);
    }
  }
}
