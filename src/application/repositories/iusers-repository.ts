import { User } from '../../domain/entities/user';

export type CreateUserDto = {
  username: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  driver_license: string;
};

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<User | null | undefined>;
  findUserById(id: string): Promise<User | null | undefined>;
  create(input: CreateUserDto): Promise<void>;
}
