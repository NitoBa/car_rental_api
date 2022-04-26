import { DevolutionRentalUsecase } from '../../../application/usecases/devolutionRental/devolution-rental-usecase';
import { ok, badRequest } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

type DevolutionRentalRequest = {
  params: {
    rentalId: string;
  };
  headers: {
    userId: string;
  };
};

export class DevolutionRentalController
  implements IController<DevolutionRentalRequest>
{
  constructor(private devolutionRentalUsecase: DevolutionRentalUsecase) {}

  async handle({
    headers,
    params,
  }: DevolutionRentalRequest): Promise<HttpResponse> {
    try {
      const { userId } = headers;
      const { rentalId } = params;
      const totalPriceRental = await this.devolutionRentalUsecase.execute({
        rentalId,
        userId,
      });

      return ok(totalPriceRental);
    } catch (error) {
      return badRequest(error);
    }
  }
}
