export interface ISendEMailRepository {
  sendMail(email: string, subject: string, text: string): Promise<void>;
}
