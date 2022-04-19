/* eslint-disable no-empty */
import { resolve } from 'path';

import { UpdateUserAvatarDTO } from '../../dtos/update-user-avatar-dto';
import { IFileSystemRepository } from '../../repositories/ifilesystem-repository';
import { IUsersRepository } from '../../repositories/iusers-repository';

export class UpdateUserAvatarUsecase {
  constructor(
    private usersRepository: IUsersRepository,
    private fileSystemRepository: IFileSystemRepository
  ) {}

  async execute({ userId, avatar_file }: UpdateUserAvatarDTO): Promise<void> {
    if (!userId || !avatar_file) {
      throw new Error('userId and avatar_file are required');
    }

    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.avatar) {
      await this.fileSystemRepository.deleteFile(
        resolve('tmp', 'avatar', user.avatar)
      );
    }

    await this.usersRepository.updateUserAvatar(userId, avatar_file);
  }
}
