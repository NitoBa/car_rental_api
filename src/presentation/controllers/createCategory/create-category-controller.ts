import { CreateCategoryUsecase } from '../../../application/usecases/createCategory/create-category-usecase';
import { badRequest, noContent } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

type CreateCategoryRequest = {
  body: {
    name: string;
    description: string;
  };
};

export class CreateCategoryController
  implements IController<CreateCategoryRequest>
{
  constructor(private readonly createCategory: CreateCategoryUsecase) {}
  async handle({
    body: { name, description },
  }: CreateCategoryRequest): Promise<HttpResponse> {
    try {
      await this.createCategory.execute({ name, description });
      return noContent();
    } catch (error) {
      return badRequest(error);
    }
  }
}
