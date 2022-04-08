import { LoginEmailPasswordUsecase } from '../../application/usecases/login-email-password-usecase';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type AuthenticateUserRequest = {
  body: {
    email: string;
    password: string;
  };
};

export class AuthenticateUserController
  implements IController<AuthenticateUserRequest>
{
  constructor(
    private loginWithEmailPasswordUsecase: LoginEmailPasswordUsecase
  ) {}

  async handle({ body }: AuthenticateUserRequest): Promise<HttpResponse> {
    try {
      const { email, password } = body;
      const token = await this.loginWithEmailPasswordUsecase.execute(
        email,
        password
      );

      return ok(token);
    } catch (error) {
      return badRequest(error);
    }
  }
}
