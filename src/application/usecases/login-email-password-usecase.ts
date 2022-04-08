import { IEncryptRepository } from '../repositories/iencrypt-repository';
import { IJwtRepository } from '../repositories/ijwt-repository';
import { IUsersRepository } from '../repositories/iusers-repository';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
};

export class LoginEmailPasswordUsecase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly encryptRepository: IEncryptRepository,
    private readonly jwtRepository: IJwtRepository
  ) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.encryptRepository.compare(
      password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = this.jwtRepository.sign(user.id, {
      email: user.email,
      name: user.name,
      username: user.username,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token,
    };
  }
}
