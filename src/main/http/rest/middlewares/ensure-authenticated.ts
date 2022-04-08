import { IJwtRepository } from '../../../../application/repositories/ijwt-repository';
import { IUsersRepository } from '../../../../application/repositories/iusers-repository';
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
  constructor(
    private jwtRepository: IJwtRepository,
    private usersRepository: IUsersRepository
  ) {}

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

      const { sub: userId } = this.jwtRepository.verify(token);

      const user = await this.usersRepository.findUserById(userId);

      if (!user) {
        return unauthorized(new Error('User does not exists'));
      }

      return ok(user);
    } catch (error) {
      return unauthorized(error);
    }
  }
}
