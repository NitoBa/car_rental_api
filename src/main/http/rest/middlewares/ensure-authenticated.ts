import { IJwtRepository } from '../../../../application/repositories/ijwt-repository';
import {
  ok,
  unauthorized,
} from '../../../../presentation/helpers/http-response-helper';
import { HttpResponse } from '../../../../presentation/interfaces/http-response';
import { IMiddleware } from '../../../../presentation/interfaces/middleware';

type EnsureAuthenticatedRequest = {
  headers: {
    authorization: string;
  };
};

export class EnsureAuthenticatedMiddleware
  implements IMiddleware<EnsureAuthenticatedRequest>
{
  constructor(private jwtRepository: IJwtRepository) {}

  async handle(req: EnsureAuthenticatedRequest): Promise<HttpResponse> {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return unauthorized(new Error('Token not provided'));
      }

      const [, token] = authorization.split(' ');

      if (!token) {
        return unauthorized(new Error('Token not provided'));
      }

      this.jwtRepository.verify(token);

      return ok(null);
    } catch (error) {
      return unauthorized(error);
    }
  }
}
