import { CreateRefreshTokenUsecase } from '../../../application/usecases/createRefreshToken/create-refresh-token-usecase';
import { badRequest, ok } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

type CreateRefreshTokenRequest = {
  body?: { token: string };
  headers?: { ['x-access-token']: string };
  query?: { token: string };
};

export class CreateRefreshTokenController
  implements IController<CreateRefreshTokenRequest>
{
  constructor(
    private readonly createRefreshTokenUsecase: CreateRefreshTokenUsecase
  ) {}
  async handle(request: CreateRefreshTokenRequest): Promise<HttpResponse> {
    try {
      const token =
        request.body.token || request.query.token || request.headers;

      const response = await this.createRefreshTokenUsecase.execute(
        token as string
      );

      return ok(response);
    } catch (error) {
      return badRequest(error);
    }
  }
}
