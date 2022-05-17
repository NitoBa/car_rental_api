import { UserTokens } from '../../domain/entities/user-tokens';
import { CreateUserTokenDTO } from '../dtos/create-user-token-dto';

export interface IUserTokenRepository {
  create(input: CreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}
