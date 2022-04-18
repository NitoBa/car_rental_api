import { CreateUserDTO } from '../../application/dtos/create-user-dto';
import { IUsersRepository } from '../../application/repositories/iusers-repository';
import { User } from '../../domain/entities/user';

export class InMemoryUserRepository implements IUsersRepository {
  users: User[] = [];
  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findUserByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
  findUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async create(input: CreateUserDTO): Promise<void> {
    const newUser = new User();
    Object.assign(newUser, input);
    this.users.push(newUser);
  }
  updateUserAvatar(id: string, avatar: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
