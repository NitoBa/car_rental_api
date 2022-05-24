import { CreateUserDTO } from '../../application/dtos/create-user-dto';
import { IUsersRepository } from '../../application/repositories/iusers-repository';
import { User } from '../../domain/entities/user';

export class InMemoryUserRepository implements IUsersRepository {
  users: User[] = [];

  async updatePassword(userId: string, password: string): Promise<void> {
    const user = this.users.find((user) => user.id === userId);
    const indexUser = this.users.indexOf(user);
    user.password = password;
    this.users[indexUser] = user;
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findUserByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
  async findUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
  async create(input: CreateUserDTO): Promise<void> {
    const newUser = new User();
    Object.assign(newUser, input);
    this.users.push(newUser);
  }
  async updateUserAvatar(id: string, avatar: string): Promise<void> {
    const user = await this.findUserById(id);
    const indexUser = this.users.indexOf(user);
    user.avatar = avatar;
    this.users[indexUser] = user;
  }
}
