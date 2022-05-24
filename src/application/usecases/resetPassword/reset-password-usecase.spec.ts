import { User } from '../../../domain/entities/user';
import { InMemoryEncryptRepository } from '../../../tests/repositories/in-memory-encrytor-repository';
import { InMemoryHandleDateRepository } from '../../../tests/repositories/in-memory-handle-date-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { InMemoryUserTokenRepository } from '../../../tests/repositories/in-memory-user-token-repository';
import { ResetPasswordUsecase } from './reset-password-usecase';

const makeSut = () => {
  const encryptRepository = new InMemoryEncryptRepository();
  const userRepository = new InMemoryUserRepository();
  const usersTokensRepository = new InMemoryUserTokenRepository();
  const handleDateRepository = new InMemoryHandleDateRepository();
  const sut = new ResetPasswordUsecase(
    userRepository,
    usersTokensRepository,
    handleDateRepository,
    encryptRepository
  );
  return {
    sut,
    userRepository,
    usersTokensRepository,
    handleDateRepository,
    encryptRepository,
  };
};

describe('Reset Password Usecase', () => {
  it('should not be able to reset password with invalid data', async () => {
    const { sut } = makeSut();
    const input = {
      password: '',
      token: '',
    };
    await expect(sut.execute(input)).rejects.toThrow(
      'Password and token are required'
    );
  });

  it('should not be able to reset password if token not found', async () => {
    const { sut } = makeSut();
    const input = {
      password: 'new password',
      token: 'invalid token',
    };
    await expect(sut.execute(input)).rejects.toThrow('Token not found');
  });

  it('should not be able to reset password if token is expired', async () => {
    const { sut, usersTokensRepository } = makeSut();

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getHours() + 5);

    await usersTokensRepository.create({
      expiresDate,
      userId: 'valid user id',
      refreshToken: 'valid token',
    });

    const input = {
      password: 'new password',
      token: 'valid token',
    };
    await expect(sut.execute(input)).rejects.toThrow('Token expired');
  });

  it('should not be able to reset password without new password hashed', async () => {
    const { sut, usersTokensRepository, encryptRepository, userRepository } =
      makeSut();

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getHours() - 5);

    await usersTokensRepository.create({
      expiresDate,
      userId: 'user_id',
      refreshToken: 'valid token',
    });

    userRepository.users.push(
      Object.assign(new User(), {
        id: 'user_id',
        password: 'valid password',
      })
    );

    const input = {
      password: 'new password',
      token: 'valid token',
    };

    jest.spyOn(encryptRepository, 'encrypt');

    await sut.execute(input);
    expect(encryptRepository.encrypt).toBeCalledTimes(1);
    expect(encryptRepository.encrypt).toHaveBeenCalledWith('new password');
  });

  it('should be able to reset password', async () => {
    const { sut, usersTokensRepository, userRepository } = makeSut();

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getHours() - 5);

    userRepository.users.push(
      Object.assign(new User(), {
        id: 'user_id',
        password: 'valid password',
      })
    );

    await usersTokensRepository.create({
      expiresDate,
      userId: 'user_id',
      refreshToken: 'valid token',
    });

    const input = {
      password: 'new password',
      token: 'valid token',
    };

    await expect(sut.execute(input)).resolves.toBeUndefined();
  });
});
