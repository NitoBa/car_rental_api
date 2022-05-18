export interface IMailRepository {
  sendMail(email: string, subject: string, text: string): Promise<void>;
}
