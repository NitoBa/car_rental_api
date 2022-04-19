import { CreateUserDTO } from '../../application/dtos/create-user-dto';
import { CreateUserUsecase } from '../../application/usecases/createUser/create-user-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type CreateUserRequest = {
  body: CreateUserDTO;
};

export class CreateUserController implements IController<CreateUserRequest> {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  async handle({ body }: CreateUserRequest): Promise<HttpResponse> {
    try {
      await this.createUserUsecase.execute(body);

      return created();
    } catch (error) {
      return badRequest(error);
    }
  }
}
