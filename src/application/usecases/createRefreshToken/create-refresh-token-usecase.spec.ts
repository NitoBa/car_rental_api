import { InMemoryHandleDateRepository } from '../../../tests/repositories/in-memory-handle-date-repository';
import { InMemoryJWTRepository } from '../../../tests/repositories/in-memory-jwt-repository';
import { InMemoryUserTokenRepository } from '../../../tests/repositories/in-memory-user-token-repository';
import { CreateRefreshTokenUsecase } from './create-refresh-token-usecase';

const makeSut = () => {
  const handleDateRepository = new InMemoryHandleDateRepository();
  const jwtRepository = new InMemoryJWTRepository();
  const userTokenRepository = new InMemoryUserTokenRepository();
  const sut = new CreateRefreshTokenUsecase(
    userTokenRepository,
    jwtRepository,
    handleDateRepository
  );

  return { sut, userTokenRepository };
};

describe('CreateRefreshTokenUsecase', () => {
  it('should not able to create refresh token without correct values', async () => {
    const { sut } = makeSut();

    const refreshToken = '';
    await expect(sut.execute(refreshToken)).rejects.toThrow(
      'Refresh Token is required'
    );
  });
});
