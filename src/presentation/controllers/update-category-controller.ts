import { UpdateCategoryUsecase } from '../../application/usecases/updateCategory/update-category-usecase';
import { badRequest, noContent } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type UpdateCategoryRequest = {
  params: {
    id: string;
  };
  body: {
    name: string;
    description: string;
  };
};

export class UpdateCategoryController
  implements IController<UpdateCategoryRequest>
{
  constructor(private readonly updateCategory: UpdateCategoryUsecase) {}

  async handle(req: UpdateCategoryRequest): Promise<HttpResponse> {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      if (!name || !description) {
        return badRequest(new Error('name and description are required'));
      }

      await this.updateCategory.execute({ id, name, description });
      return noContent();
    } catch (err) {
      return badRequest(err);
    }
  }
}
