import { UpdateUserAvatarUsecase } from '../../application/usecases/update-user-avatar-usecase';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

export class UpdateUserAvatarController implements IController {
  constructor(private updateAvatarUserUsecase: UpdateUserAvatarUsecase) {}
  handle(request: any): Promise<HttpResponse> {
    throw new Error('Method not implemented.');
  }
}
