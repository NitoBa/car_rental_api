import { Category } from '../../../domain/entities/category';
import { InMemoryCategoryRepository } from '../../../tests/repositories/in-memory-category-repository';
import { CreateCategoryUsecase } from './create-category-usecase';

const makeSut = () => {
  const repository = new InMemoryCategoryRepository();
  const sut = new CreateCategoryUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Create Category Usecase', () => {
  it('should not be able to create a category if already exists', async () => {
    const { sut, repository } = makeSut();
    const category: Category = {
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repository.categories.push(category);

    const result = sut.execute({
      name: 'name',
      description: 'description',
    });

    await expect(result).rejects.toThrow('Category already exists.');
  });

  it('should be able to create a category', async () => {
    const { sut, repository } = makeSut();

    const result = await sut.execute({
      name: 'name',
      description: 'description',
    });

    expect(result).toBeUndefined();
    expect(repository.categories.length).toBe(1);
    expect(repository.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'name',
        }),
      ])
    );
  });
});
