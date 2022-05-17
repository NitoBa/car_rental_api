import { ISendEMailRepository } from '../../repositories/isend-email-repository';

export class SendForgotPasswordMailUsecase {
  constructor(private sendEmailRepository: ISendEMailRepository) {}

  async execute(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    const message = [
      '<h1>Olá</h1>',
      '<p>Você solicitou uma nova senha</p>',
      '<p>Click no link abaixou para recuperar a sua senha</p>',
      '<a href="http://localhost:3000/reset-password">Recuperar senha</a>',
    ];

    await this.sendEmailRepository.sendMail(
      email,
      'Forgot Password',
      message.join('\n')
    );
  }
}
