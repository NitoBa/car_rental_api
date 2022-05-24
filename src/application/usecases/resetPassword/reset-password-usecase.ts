import { ResetPasswordDTO } from '../../dtos/reset-password-dto';
import { IHandleDateRepository } from '../../repositories/handle-date-repository';
import { IEncryptRepository } from '../../repositories/iencrypt-repository';
import { IUserTokenRepository } from '../../repositories/iuser-token-repository';
import { IUsersRepository } from '../../repositories/iusers-repository';

export class ResetPasswordUsecase {
  constructor(
    private userRepository: IUsersRepository,
    private usersTokensRepository: IUserTokenRepository,
    private handleDateRepository: IHandleDateRepository,
    private encryptRepository: IEncryptRepository
  ) {}
  async execute(input: ResetPasswordDTO): Promise<void> {
    const { password, token } = input;

    if (!password || !token) {
      throw new Error('Password and token are required');
    }

    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new Error('Token not found');
    }

    const isMoreThan3Hours =
      this.handleDateRepository.compareInHours(
        new Date(),
        userToken.expiresDate
      ) > 3;

    if (isMoreThan3Hours) {
      throw new Error('Token expired');
    }

    const passwordHashed = await this.encryptRepository.encrypt(password);

    await this.userRepository.updatePassword(userToken.userId, passwordHashed);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
