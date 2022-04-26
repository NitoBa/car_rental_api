import { ListUserRentalsUsecase } from '../../../application/usecases/listUserRentals/list-user-rentals-usecase';
import { ok, badRequest } from '../../helpers/http-response-helper';
import { IController } from '../../interfaces/controller';
import { HttpResponse } from '../../interfaces/http-response';

type ListUserRentalsRequest = {
  headers: {
    userId: string;
  };
};

export class ListUserRentalsController
  implements IController<ListUserRentalsRequest>
{
  constructor(private readonly listUserRentals: ListUserRentalsUsecase) {}
  async handle({ headers }: ListUserRentalsRequest): Promise<HttpResponse> {
    try {
      const { userId } = headers;
      const userRentals = await this.listUserRentals.execute(userId);
      return ok(userRentals);
    } catch (error) {
      return badRequest(error);
    }
  }
}
