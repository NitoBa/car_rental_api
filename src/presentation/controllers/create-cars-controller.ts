import { CreateCarUseCase } from '../../application/usecases/createCar/create-car-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type CreateCarRequest = {
  body: {
    brand: string;
    name: string;
    description: string;
    fineAmount: string;
    dailyRate: string;
    licensePlate: string;
    category: string;
  };
};

export class CreateCarsController implements IController<CreateCarRequest> {
  constructor(private createCarUsecase: CreateCarUseCase) {}

  async handle(request: CreateCarRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        description,
        fineAmount,
        dailyRate,
        licensePlate,
        category,
        brand,
      } = request.body;

      await this.createCarUsecase.execute({
        name,
        description,
        fineAmount: +fineAmount,
        dailyRate: +dailyRate,
        licensePlate,
        category,
        brand,
      });

      return created();
    } catch (error) {
      return badRequest(error);
    }
  }
}
