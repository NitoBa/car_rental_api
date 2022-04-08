import { CreateUserDTO } from '../dtos/create-user-dto';
import { IEncryptRepository } from '../repositories/iencrypt-repository';
import { IUsersRepository } from '../repositories/iusers-repository';

export class CreateUserUsecase {
  constructor(
    private usersRepository: IUsersRepository,
    private encryptRepository: IEncryptRepository
  ) {}

  async execute(input: CreateUserDTO): Promise<void> {
    console.log('input', input);
    const { name, username, email, password, driver_license } = input;

    if (!name || !username || !email || !password || !driver_license) {
      throw new Error('Missing fields');
    }
    const userAlreadyExistsEmail = await this.usersRepository.findUserByEmail(
      email
    );

    if (userAlreadyExistsEmail) {
      throw new Error('User already exists with this email');
    }

    const userAlreadyExistsUsername =
      await this.usersRepository.findUserByUsername(username);

    if (userAlreadyExistsUsername) {
      throw new Error('User already exists with this username');
    }

    const passwordHashed = await this.encryptRepository.encrypt(password);

    await this.usersRepository.create({
      name,
      username,
      email,
      password: passwordHashed,
      driver_license,
    });
  }
}
