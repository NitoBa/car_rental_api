import { UpdateUserAvatarUsecase } from '../../application/usecases/updateUserAvatar/update-user-avatar-usecase';
import { badRequest, noContent } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type UpdateUserAvatarRequest = {
  file: any;
  headers: {
    userId: any;
  };
};

export class UpdateUserAvatarController
  implements IController<UpdateUserAvatarRequest>
{
  constructor(private updateAvatarUserUsecase: UpdateUserAvatarUsecase) {}
  async handle(request: UpdateUserAvatarRequest): Promise<HttpResponse> {
    try {
      const { userId } = request.headers;
      const avatar_file = request.file.filename;

      await this.updateAvatarUserUsecase.execute({
        userId,
        avatar_file,
      });

      return noContent();
    } catch (error) {
      return badRequest(error);
    }
  }
}
