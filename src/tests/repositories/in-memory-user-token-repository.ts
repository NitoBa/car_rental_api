import { CreateUserTokenDTO } from '../../application/dtos/create-user-token-dto';
import { IUserTokenRepository } from '../../application/repositories/iuser-token-repository';
import { UserTokens } from '../../domain/entities/user-tokens';

export class InMemoryUserTokenRepository implements IUserTokenRepository {
  userTokens: UserTokens[] = [];
  async create(input: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, input);
    this.userTokens.push(userToken);

    return userToken;
  }
}
