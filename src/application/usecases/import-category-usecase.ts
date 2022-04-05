import { parse } from 'csv-parse';
import { createReadStream } from 'node:fs';

import { ICategoryRepository } from '../repositories/icategory-repository';

type ImportCategory = {
  name: string;
  description: string;
};

export class ImportCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  private async loadCategories(
    file: Express.Multer.File
  ): Promise<ImportCategory[]> {
    const categories = await new Promise<ImportCategory[]>((resolve) => {
      const categories: ImportCategory[] = [];
      const stream = createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on('readable', () => {
        const [name, description] = parseFile.read();
        categories.push({ name, description });
      });

      parseFile.on('error', () => {
        resolve([]);
      });
      parseFile.on('end', () => {
        resolve(categories);
      });
    });

    return categories;
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    if (categories.length === 0) {
      throw new Error('File is empty');
    }
    categories.map(async (category) => {
      const { name, description } = category;

      const categoryExists = await this.categoryRepository.findByName(name);

      if (!categoryExists) {
        await this.categoryRepository.create({ name, description });
      }
    });
  }
}
