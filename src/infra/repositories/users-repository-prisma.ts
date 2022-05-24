import { PrismaClient } from '@prisma/client';

import { CreateUserDTO } from '../../application/dtos/create-user-dto';
import { IUsersRepository } from '../../application/repositories/iusers-repository';
import { User } from '../../domain/entities/user';

export class UsersRepositoryPrisma implements IUsersRepository {
  constructor(private prisma: PrismaClient) {}
  async updatePassword(userId: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password,
      },
    });
  }
  async updateUserAvatar(id: string, avatar: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        avatar,
      },
    });
  }
  async findUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
  async findUserById(id: string): Promise<User | null | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
  async create({
    username,
    name,
    email,
    password,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        username,
        name,
        email,
        password,
        driver_license,
      },
    });
  }
}
