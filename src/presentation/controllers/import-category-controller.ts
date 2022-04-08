import { rm } from 'node:fs/promises';

import { ImportCategoryUsecase } from '../../application/usecases/import-category-usecase';
import { badRequest, ok } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type ImportCategoryRequest = {
  file: any;
};

export class ImportCategory implements IController<ImportCategoryRequest> {
  constructor(private importCategory: ImportCategoryUsecase) {}
  async handle({ file }: ImportCategoryRequest): Promise<HttpResponse> {
    try {
      await this.importCategory.execute(file);
      await rm(file.path);

      return ok({ message: 'Categories imported successfully' });
    } catch (err) {
      return badRequest(err);
    }
  }
}
