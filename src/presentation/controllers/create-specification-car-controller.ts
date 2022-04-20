import { CreateSpecificationCarUseCase } from '../../application/usecases/createSpecificationCar/create-specification-car-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type CreateSpecificationCarRequest = {
  body: {
    carId: string;
    specificationsId: string[];
  };
};

export class CreateSpecificationCarController
  implements IController<CreateSpecificationCarRequest>
{
  constructor(
    private createSpecificationCarUsecase: CreateSpecificationCarUseCase
  ) {}
  async handle(request: CreateSpecificationCarRequest): Promise<HttpResponse> {
    try {
      const { carId, specificationsId } = request.body;
      await this.createSpecificationCarUsecase.execute(specificationsId, carId);
      return created('Specification car created');
    } catch (error) {
      return badRequest(error);
    }
  }
}
