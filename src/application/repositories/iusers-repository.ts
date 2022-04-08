import { User } from '../../domain/entities/user';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<User | null | undefined>;
  findUserByUsername(username: string): Promise<User | null | undefined>;
  findUserById(id: string): Promise<User | null | undefined>;
  create(input: CreateUserDTO): Promise<void>;
  updateUserAvatar(id: string, avatar: string): Promise<void>;
}
