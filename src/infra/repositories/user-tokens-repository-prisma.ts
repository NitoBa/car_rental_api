import { PrismaClient } from '@prisma/client';

import { CreateUserTokenDTO } from '../../application/dtos/create-user-token-dto';
import { IUserTokenRepository } from '../../application/repositories/iuser-token-repository';
import { UserTokens } from '../../domain/entities/user-tokens';

export class UserTokenRepository implements IUserTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(input: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.prisma.userToken.create({
      data: {
        expiresDate: input.expiresDate,
        userId: input.userId,
        refreshToken: input.refreshToken,
      },
    });

    return userToken;
  }
}
