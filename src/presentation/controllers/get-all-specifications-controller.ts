import { GetAllSpecificationsUsecase } from '../../application/usecases/GetAllSpecifications/get-all-specifications-usecase';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

export class GetAllSpecificationsController implements IController {
  constructor(
    private readonly getAllSpecifications: GetAllSpecificationsUsecase
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const specifications = await this.getAllSpecifications.execute();
      return ok(specifications);
    } catch (error) {
      return badRequest(error);
    }
  }
}
