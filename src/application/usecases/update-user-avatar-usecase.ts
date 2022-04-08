import { UpdateUserAvatarDTO } from '../dtos/update-user-avatar-dto';
import { IUsersRepository } from '../repositories/iusers-repository';

export class UpdateUserAvatarUsecase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId, avatar_file }: UpdateUserAvatarDTO): Promise<void> {
    if (!userId || !avatar_file) {
      throw new Error('userId and avatar_file are required');
    }

    await this.usersRepository.updateUserAvatar(userId, avatar_file);
  }
}
