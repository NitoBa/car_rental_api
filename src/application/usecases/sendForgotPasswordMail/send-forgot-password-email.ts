import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

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

    const forgotPasswordEmailTemplate = readFileSync(
      resolve(
        __dirname,
        '../../../presentation/views/forgot-password-email.html'
      )
    ).toString('utf-8');

    const message = forgotPasswordEmailTemplate
      .replace('{username}', user.name)
      .replace(
        '{link}',
        `http://localhost:3333/reset-password?token=${newToken.refreshToken}`
      );

    await this.sendEmailRepository.sendMail(email, 'Forgot Password', message);
  }
}
