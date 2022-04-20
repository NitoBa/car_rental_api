import { GetAllAvailableCarsUsecase } from '../../application/usecases/getAllAvailableCars/get-all-available-cars';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

export class GetAllAvailableCarsController implements IController {
  constructor(private getAllAvailableCarsUsecase: GetAllAvailableCarsUsecase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const cars = await this.getAllAvailableCarsUsecase.execute();
      return ok(cars);
    } catch (error) {
      return badRequest(error);
    }
  }
}
