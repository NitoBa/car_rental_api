import { LoginEmailPasswordUsecase } from '../../../../application/usecases/AuthenticateUser/login-email-password-usecase';
import { CreateUserUsecase } from '../../../../application/usecases/createUser/create-user-usecase';
import { UpdateUserAvatarUsecase } from '../../../../application/usecases/updateUserAvatar/update-user-avatar-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { EncryptRepositoryBcrypt } from '../../../../infra/repositories/encrypt-repository-bcrypt';
import { FileSystemRepository } from '../../../../infra/repositories/file-system-repository';
import { JwtRepository } from '../../../../infra/repositories/jwt-repository';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { AuthenticateUserController } from '../../../../presentation/controllers/authenticate-user-controller';
import { CreateUserController } from '../../../../presentation/controllers/create-user-controller';
import { UpdateUserAvatarController } from '../../../../presentation/controllers/update-user-avatar-controller';
import { EnsureAuthenticatedMiddleware } from '../middlewares/ensure-authenticated';

const usersRepository = new UsersRepositoryPrisma(prisma);
const encryptRepository = new EncryptRepositoryBcrypt();
const jwtRepository = new JwtRepository();

export const createCreateUserController = () => {
  const usecase = new CreateUserUsecase(usersRepository, encryptRepository);
  return new CreateUserController(usecase);
};

export const createAuthenticateUserController = () => {
  const usecase = new LoginEmailPasswordUsecase(
    usersRepository,
    encryptRepository,
    jwtRepository
  );

  return new AuthenticateUserController(usecase);
};

export const createEnsureAuthenticatedMiddleware = () => {
  return new EnsureAuthenticatedMiddleware(jwtRepository, usersRepository);
};

export const createUpdateUserAvatarController = () => {
  const repository = new FileSystemRepository();
  const usecase = new UpdateUserAvatarUsecase(usersRepository, repository);
  return new UpdateUserAvatarController(usecase);
};
