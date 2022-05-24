import { ResetPasswordUsecase } from '../../../application/usecases/resetPassword/reset-password-usecase';
import { badRequest, ok } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

type ResetPasswordRequest = {
  body: {
    password: string;
  };
  params: {
    token: string;
  };
};

export class ResetPasswordController
  implements IController<ResetPasswordRequest>
{
  constructor(private readonly resetPasswordUsecase: ResetPasswordUsecase) {}
  async handle(request: ResetPasswordRequest): Promise<HttpResponse> {
    try {
      const { password } = request.body;
      const { token } = request.params;
      await this.resetPasswordUsecase.execute({
        password,
        token,
      });
      return ok({ message: 'Reset password successfully' });
    } catch (error) {
      return badRequest(error);
    }
  }
}
