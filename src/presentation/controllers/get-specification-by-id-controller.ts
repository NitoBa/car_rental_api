import { GetSpecificationByIdUsecase } from '../../application/usecases/get-specification-by-id-usecase';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type GetSpecificationByIdRequest = {
  params: {
    id: string;
  };
};

export class GetSpecificationByIdController
  implements IController<GetSpecificationByIdRequest>
{
  constructor(private getSpecificationById: GetSpecificationByIdUsecase) {}
  async handle({
    params: { id },
  }: GetSpecificationByIdRequest): Promise<HttpResponse> {
    try {
      if (!id) {
        return badRequest(new Error('id is required'));
      }

      const specification = await this.getSpecificationById.execute(id);
      return ok(specification);
    } catch (error) {
      return badRequest(error);
    }
  }
}
