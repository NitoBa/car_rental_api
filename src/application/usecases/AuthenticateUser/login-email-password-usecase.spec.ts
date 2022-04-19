import { InMemoryEncryptRepository } from '../../../tests/repositories/in-memory-encrytor-repository';
import { InMemoryJWTRepository } from '../../../tests/repositories/in-memory-jwt-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { LoginEmailPasswordUsecase } from './login-email-password-usecase';

const makeSut = () => {
  const jwtRepository = new InMemoryJWTRepository();
  const encryptRepository = new InMemoryEncryptRepository();
  const userRepository = new InMemoryUserRepository();
  const sut = new LoginEmailPasswordUsecase(
    userRepository,
    encryptRepository,
    jwtRepository
  );

  return {
    sut,
    jwtRepository,
    encryptRepository,
    userRepository,
  };
};

describe('Login With Email and Password', () => {
  it('should not be able to login without email and password', async () => {
    const { sut } = makeSut();

    const result = sut.execute('', '');

    await expect(result).rejects.toThrow('Email and password are required');
  });

  it('should not be able to login if user not exists with email provided', async () => {
    const { sut } = makeSut();

    const result = sut.execute('email@email.com', 'password');

    await expect(result).rejects.toThrow('User not found');
  });

  it('should not be able to login if password is incorrect', async () => {
    const { sut, userRepository, encryptRepository } = makeSut();

    const email = 'email@example.com';
    const password = 'password';

    await userRepository.create({
      name: 'any_name',
      email,
      password,
      username: 'username',
      driver_license: 'driver_license',
    });

    await encryptRepository.encrypt(password);

    const result = sut.execute(email, password);

    await expect(result).rejects.toThrow('Invalid password');
  });

  it('should be able to return a user and toke if password and email is correct', async () => {
    const { sut, userRepository, encryptRepository } = makeSut();

    const email = 'email@example.com';
    const password = 'password';
    const newPassword = await encryptRepository.encrypt(password);

    await userRepository.create({
      name: 'any_name',
      email,
      password: newPassword,
      username: 'username',
      driver_license: 'driver_license',
    });

    const result = await sut.execute(email, password);
    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({ name: 'any_name' }),
      })
    );
  });
});
