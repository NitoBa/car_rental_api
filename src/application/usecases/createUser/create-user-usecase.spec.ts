import { InMemoryEncryptRepository } from '../../../tests/repositories/in-memory-encrytor-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { CreateUserUsecase } from './create-user-usecase';

const makeSut = () => {
  const encryptRepository = new InMemoryEncryptRepository();
  const userRepository = new InMemoryUserRepository();
  const sut = new CreateUserUsecase(userRepository, encryptRepository);
  return {
    sut,
    userRepository,
    encryptRepository,
  };
};

describe('Create User Usecase', () => {
  it('should not be able to create a user with invalid params', async () => {
    const { sut } = makeSut();
    const result = sut.execute({
      name: '',
      username: '',
      email: '',
      password: '',
      driver_license: '',
    });
    await expect(result).rejects.toThrow('Missing fields');
  });

  it('should not be able to create a user if already exists with email', async () => {
    const { sut, userRepository } = makeSut();

    userRepository.users.push({
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
      email: 'email@email.com',
      password: 'valid_password',
      driver_license: 'valid_driver_license',
      admin: false,
      avatar: 'valid_avatar',
      createdAt: new Date(),
    });

    const result = sut.execute({
      name: 'name',
      username: 'username',
      email: 'email@email.com',
      password: 'password',
      driver_license: '123123421',
    });
    await expect(result).rejects.toThrow('User already exists with this email');
  });

  it('should not be able to create a user if already exists with username', async () => {
    const { sut, userRepository } = makeSut();

    userRepository.users.push({
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
      email: 'email@email.com',
      password: 'valid_password',
      driver_license: 'valid_driver_license',
      admin: false,
      avatar: 'valid_avatar',
      createdAt: new Date(),
    });

    const result = sut.execute({
      name: 'name',
      username: 'valid_username',
      email: 'newemail@email.com',
      password: 'password',
      driver_license: '123123421',
    });
    await expect(result).rejects.toThrow(
      'User already exists with this username'
    );
  });

  it('should be able to create a user', async () => {
    const { sut, userRepository } = makeSut();

    const result = await sut.execute({
      name: 'name',
      username: 'valid_username',
      email: 'newemail@email.com',
      password: 'password',
      driver_license: '123123421',
    });
    expect(result).toBeUndefined();
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0].name).toBe('name');
  });
});
