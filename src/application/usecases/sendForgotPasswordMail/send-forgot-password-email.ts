import { randomUUID } from 'node:crypto';

import { IMailRepository } from '../../repositories/email-repository';
import { IHandleDateRepository } from '../../repositories/handle-date-repository';
import { IUserTokenRepository } from '../../repositories/iuser-token-repository';
import { IUsersRepository } from '../../repositories/iusers-repository';

export class SendForgotPasswordMailUsecase {
  constructor(
    private sendEmailRepository: IMailRepository,
    private userRepository: IUsersRepository,
    private usersTokensRepository: IUserTokenRepository,
    private handleDateRepository: IHandleDateRepository
  ) {}

  async execute(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const expiresDate = this.handleDateRepository.addHours(3);

    const newToken = await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: randomUUID(),
      expiresDate,
    });

    const message = [
      '<h1>Olá, Tudo bem?</h1>',
      '<br />',
      '<p>Você solicitou uma nova senha</p>',
      '<br />',
      '<p>Click no link abaixou para recuperar a sua senha</p>',
      '<br />',
      `<a href='http://localhost:3000/reset-password/${newToken.refreshToken}'>
        <button>Recuperar senha</button>
      </a>`,
    ];

    await this.sendEmailRepository.sendMail(
      email,
      'Forgot Password',
      message.join('\n')
    );
  }
}
