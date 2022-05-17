import { IHandleDateRepository } from '../../repositories/handle-date-repository';
import { IJwtRepository } from '../../repositories/ijwt-repository';
import { IUserTokenRepository } from '../../repositories/iuser-token-repository';

export class CreateRefreshTokenUsecase {
  constructor(
    private readonly userTokenRepository: IUserTokenRepository,
    private readonly jwtRepository: IJwtRepository,
    private readonly handleDateRepository: IHandleDateRepository
  ) {}

  async execute(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    if (!refreshToken) {
      throw new Error('Refresh Token is required');
    }

    const { payload, sub: userId } =
      this.jwtRepository.verifyRefreshToken(refreshToken);

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken
      );

    if (!userToken) {
      throw new Error('User Token not found');
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const token = this.jwtRepository.sign(userId, payload);

    const { refreshToken: newRefreshToken } =
      await this.userTokenRepository.create({
        userId,
        expiresDate: this.handleDateRepository.addHours(1),
        refreshToken: token,
      });

    return { token, refreshToken: newRefreshToken };
  }
}
