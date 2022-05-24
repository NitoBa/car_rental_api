import { CreateUserTokenDTO } from '../../application/dtos/create-user-token-dto';
import { IUserTokenRepository } from '../../application/repositories/iuser-token-repository';
import { UserTokens } from '../../domain/entities/user-tokens';

export class InMemoryUserTokenRepository implements IUserTokenRepository {
  userTokens: UserTokens[] = [];
  async findByToken(token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refreshToken === token
    );
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    this.userTokens = this.userTokens.filter(
      (userToken) => userToken.id !== id
    );
  }
  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userTokens = this.userTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );
    return userTokens;
  }
  async create(input: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, input);
    this.userTokens.push(userToken);

    return userToken;
  }
}
