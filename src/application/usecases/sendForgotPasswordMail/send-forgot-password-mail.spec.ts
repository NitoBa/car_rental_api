import { User } from '../../../domain/entities/user';
import { InMemoryHandleDateRepository } from '../../../tests/repositories/in-memory-handle-date-repository';
import { InMemorySendEMailRepository } from '../../../tests/repositories/in-memory-send-email-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { InMemoryUserTokenRepository } from '../../../tests/repositories/in-memory-user-token-repository';
import { SendForgotPasswordMailUsecase } from './send-forgot-password-email';

const makeSut = () => {
  const handleDateRepository = new InMemoryHandleDateRepository();
  const userRepository = new InMemoryUserRepository();
  const usersToken = new InMemoryUserTokenRepository();
  const sendEmailRepository = new InMemorySendEMailRepository();
  const sut = new SendForgotPasswordMailUsecase(
    sendEmailRepository,
    userRepository,
    usersToken,
    handleDateRepository
  );

  return {
    sut,
    sendEmailRepository,
    userRepository,
    usersToken,
    handleDateRepository,
  };
};
describe('Send Forgot Password Mail', () => {
  it('Should not able to send forgot password email without email', async () => {
    const { sut } = makeSut();
    await expect(sut.execute(null)).rejects.toThrow('Email is required');
  });

  it('Should not able to send forgot password email if user not exists', async () => {
    const { sut } = makeSut();
    const email = 'invalidEmail';
    await expect(sut.execute(email)).rejects.toThrow('User not found');
  });

  it('Should be able to send forget password email', async () => {
    const { sut, sendEmailRepository, userRepository } = makeSut();
    const email = 'valid_email@valid_email.com';

    userRepository.users.push(Object.assign(new User(), { email }));
    const sendMailSpy = jest.spyOn(sendEmailRepository, 'sendMail');

    const result = await sut.execute(email);

    expect(sendMailSpy).toBeCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
