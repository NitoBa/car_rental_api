import { PrismaClient } from '@prisma/client';

import { CreateUserDTO } from '../../application/dtos/create-user-dto';
import { IUsersRepository } from '../../application/repositories/iusers-repository';
import { User } from '../../domain/entities/user';

export class AccountRepositoryPrisma implements IUsersRepository {
  constructor(private prisma: PrismaClient) {}

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