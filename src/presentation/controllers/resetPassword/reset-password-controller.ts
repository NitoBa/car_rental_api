import { ResetPasswordUsecase } from '../../../application/usecases/resetPassword/reset-password-usecase';
import { badRequest, ok } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

export class ResetPasswordController implements IController {
  constructor(private readonly resetPasswordUsecase: ResetPasswordUsecase) {}
  async handle(request: any): Promise<HttpResponse> {
    try {
      await this.resetPasswordUsecase.execute();
      return ok({ message: 'Reset password successfully' });
    } catch (error) {
      return badRequest(error);
    }
  }
}
