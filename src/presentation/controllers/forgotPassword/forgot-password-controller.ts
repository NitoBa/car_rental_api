import { SendForgotPasswordMailUsecase } from '../../../application/usecases/sendForgotPasswordMail/send-forgot-password-email';
import { badRequest, ok } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

export type SendForgotPasswordEmailRequest = {
  body: {
    email: string;
  };
};

export class SendForgotPasswordEmailController
  implements IController<SendForgotPasswordEmailRequest>
{
  constructor(private forgotPasswordUsecase: SendForgotPasswordMailUsecase) {}
  async handle(request: SendForgotPasswordEmailRequest): Promise<HttpResponse> {
    try {
      const { email } = request.body;
      await this.forgotPasswordUsecase.execute(email);
      return ok({ message: 'Email sent!' });
    } catch (error) {
      return badRequest(error);
    }
  }
}
