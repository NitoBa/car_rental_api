import { User } from '../../domain/entities/user';

type CreateUserDto = {
  username: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
};

export interface IAccountRepository {
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  create(input: CreateUserDto): Promise<void>;
}
