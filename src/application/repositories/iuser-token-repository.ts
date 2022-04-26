import { UserTokens } from '../../domain/entities/user-tokens';
import { CreateUserTokenDTO } from '../dtos/create-user-token-dto';

export interface IUserTokenRepository {
  create(input: CreateUserTokenDTO): Promise<UserTokens>;
}
