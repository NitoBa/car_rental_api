import { InMemorySendEMailRepository } from '../../../tests/repositories/in-memory-send-email-repository';
import { SendForgotPasswordMailUsecase } from './send-forgot-password-email';

const makeSut = () => {
  const sendEmailRepository = new InMemorySendEMailRepository();
  const sut = new SendForgotPasswordMailUsecase(sendEmailRepository);

  return {
    sut,
    sendEmailRepository,
  };
};
describe('Send Forgot Password Mail', () => {
  it('Should not able to send forgot password email without email', async () => {
    const { sut } = makeSut();
    await expect(sut.execute(null)).rejects.toThrow('Email is required');
  });

  it('Should be able to send forget password email', async () => {
    const { sut, sendEmailRepository } = makeSut();
    const sendMailSpy = jest.spyOn(sendEmailRepository, 'sendMail');

    const result = await sut.execute('valid_email@valid_email.com');

    expect(sendMailSpy).toBeCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
