import { CreateSpecificationUsecase } from '../../application/usecases/createSpecification/create-specification-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type CreateSpecificationRequest = {
  body: {
    name: string;
    description: string;
  };
};

export class CreateSpecificationController
  implements IController<CreateSpecificationRequest>
{
  constructor(
    private readonly createSpecification: CreateSpecificationUsecase
  ) {}
  async handle({
    body: { name, description },
  }: CreateSpecificationRequest): Promise<HttpResponse> {
    try {
      console.log(`${name}: ${description}`);
      if (!description || !name) {
        return badRequest(new Error('Missing parameters'));
      }
      await this.createSpecification.execute({ name, description });
      return created();
    } catch (error) {
      return badRequest(error);
    }
  }
}
