import { CreateUserUsecase } from '../../../../application/usecases/create-user-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { EncryptRepositoryBcrypt } from '../../../../infra/repositories/encrypt-repository-bcrypt';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { CreateUserController } from '../../../../presentation/controllers/create-user-controller';

const usersRepository = new UsersRepositoryPrisma(prisma);
const encryptRepository = new EncryptRepositoryBcrypt();

export const createCreateUserController = () => {
  const usecase = new CreateUserUsecase(usersRepository, encryptRepository);
  return new CreateUserController(usecase);
};
