import { GetAllCategoriesUsecase } from '../../application/usecases/get-all-categories-usecase';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

export class GetAllCategoriesController implements IController {
  constructor(private readonly getAllCategories: GetAllCategoriesUsecase) {}
  async handle(): Promise<HttpResponse> {
    try {
      const categories = await this.getAllCategories.execute();
      return ok(categories);
    } catch (error) {
      return badRequest(error);
    }
  }
}
