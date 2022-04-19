import { InMemoryUserRepository } from '../../tests/repositories/in-memory-user-repository';
import { IFileSystemRepository } from '../repositories/ifilesystem-repository';
import { UpdateUserAvatarUsecase } from './update-user-avatar-usecase';

class InMemoryFileSystemRepository implements IFileSystemRepository {
  files = [];

  async deleteFile(filename: string): Promise<void> {
    this.files = this.files.filter((file) => file !== filename);
  }
}

const makeSut = () => {
  const fileSystemRepository = new InMemoryFileSystemRepository();
  const userRepository = new InMemoryUserRepository();
  const sut = new UpdateUserAvatarUsecase(userRepository, fileSystemRepository);
  return {
    sut,
    userRepository,
    fileSystemRepository,
  };
};

describe('UpdateUserAvatarUsecase', () => {
  it('should not be able to update user avatar if user not exists', async () => {
    const { sut } = makeSut();

    const result = sut.execute({
      userId: 'any_id',
      avatar_file: 'any_file',
    });

    await expect(result).rejects.toThrow('User not found');
  });

  it('should update user avatar', async () => {
    const { sut, userRepository } = makeSut();

    userRepository.users.push({
      id: 'any_id',
      name: 'any_name',
      username: 'any_username',
      email: 'email@email.com',
      password: 'any_password',
      avatar: 'any_avatar',
      admin: false,
      driver_license: 'any_driver_license',
      createdAt: new Date(),
    });

    const result = await sut.execute({
      userId: 'any_id',
      avatar_file: 'new_avatar.jpg',
    });

    expect(result).toBeUndefined();
    expect(userRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          avatar: 'new_avatar.jpg',
        }),
      ])
    );
  });
});
