import { LoginEmailPasswordUsecase } from '../../../../application/usecases/AuthenticateUser/login-email-password-usecase';
import { CreateRefreshTokenUsecase } from '../../../../application/usecases/createRefreshToken/create-refresh-token-usecase';
import { CreateUserUsecase } from '../../../../application/usecases/createUser/create-user-usecase';
import { ResetPasswordUsecase } from '../../../../application/usecases/resetPassword/reset-password-usecase';
import { SendForgotPasswordMailUsecase } from '../../../../application/usecases/sendForgotPasswordMail/send-forgot-password-email';
import { UpdateUserAvatarUsecase } from '../../../../application/usecases/updateUserAvatar/update-user-avatar-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { EncryptRepositoryBcrypt } from '../../../../infra/repositories/encrypt-repository-bcrypt';
import { FileSystemRepository } from '../../../../infra/repositories/file-system-repository';
import { HandleDateRepositoryDayJs } from '../../../../infra/repositories/handle-date-repository-dayjs';
import { JwtRepository } from '../../../../infra/repositories/jwt-repository';
import { MailRepositoryEthereal } from '../../../../infra/repositories/mail-repository-ethereal';
import { UserTokenRepository } from '../../../../infra/repositories/user-tokens-repository-prisma';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { AuthenticateUserController } from '../../../../presentation/controllers/authenticate-user-controller';
import { CreateUserController } from '../../../../presentation/controllers/create-user-controller';
import { CreateRefreshTokenController } from '../../../../presentation/controllers/createRefreshToken/create-refresh-token-controller';
import { SendForgotPasswordEmailController } from '../../../../presentation/controllers/forgotPassword/forgot-password-controller';
import { ResetPasswordController } from '../../../../presentation/controllers/resetPassword/reset-password-controller';
import { UpdateUserAvatarController } from '../../../../presentation/controllers/update-user-avatar-controller';
import { EnsureAuthenticatedMiddleware } from '../middlewares/ensure-authenticated';

const usersRepository = new UsersRepositoryPrisma(prisma);
const encryptRepository = new EncryptRepositoryBcrypt();
const jwtRepository = new JwtRepository();
const usersTokensRepository = new UserTokenRepository(prisma);
const handleDateRepository = new HandleDateRepositoryDayJs();

export const createCreateUserController = () => {
  const usecase = new CreateUserUsecase(usersRepository, encryptRepository);
  return new CreateUserController(usecase);
};

export const createAuthenticateUserController = () => {
  const usecase = new LoginEmailPasswordUsecase(
    usersRepository,
    encryptRepository,
    jwtRepository,
    usersTokensRepository,
    handleDateRepository
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

export const createRefreshTokenController = () => {
  const usecase = new CreateRefreshTokenUsecase(
    usersTokensRepository,
    jwtRepository,
    handleDateRepository
  );

  return new CreateRefreshTokenController(usecase);
};

export const createSendForgotPasswordEmailController = () => {
  const repository = new MailRepositoryEthereal();
  const usecase = new SendForgotPasswordMailUsecase(
    repository,
    usersRepository,
    usersTokensRepository,
    handleDateRepository
  );
  return new SendForgotPasswordEmailController(usecase);
};

export const createResetPasswordController = () => {
  const usecase = new ResetPasswordUsecase(
    usersRepository,
    usersTokensRepository,
    handleDateRepository,
    encryptRepository
  );
  return new ResetPasswordController(usecase);
};
