import { CreateRentalUsecase } from '../../application/usecases/createRental/create-rental-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type CreateRentalRequest = {
  body: {
    userId: string;
    carId: string;
    expectReturnDate: Date;
  };
};

export class CreateRentalController
  implements IController<CreateRentalRequest>
{
  constructor(private readonly createRentalUsecase: CreateRentalUsecase) {}
  async handle(request: CreateRentalRequest): Promise<HttpResponse> {
    try {
      const { userId, carId, expectReturnDate } = request.body;
      const rental = await this.createRentalUsecase.execute({
        userId,
        carId,
        expectReturnDate,
      });
      return created(rental);
    } catch (error) {
      return badRequest(error);
    }
  }
}
