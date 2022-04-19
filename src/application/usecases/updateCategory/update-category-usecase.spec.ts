import { InMemoryCategoryRepository } from '../../../tests/repositories/in-memory-category-repository';
import { UpdateCategoryUsecase } from './update-category-usecase';

const makeSut = () => {
  const repository = new InMemoryCategoryRepository();
  const sut = new UpdateCategoryUsecase(repository);
  return {
    sut,
    repository,
  };
};
describe('Update Category Usecase', () => {
  it('should not be able to update a category if no exists', async () => {
    const { sut } = makeSut();
    const result = sut.execute({
      id: 'id',
      name: 'name',
      description: 'description',
    });

    await expect(result).rejects.toThrow('Category not found');
  });

  it('should be able to update a category', async () => {
    const { sut, repository } = makeSut();

    repository.categories.push({
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await sut.execute({
      id: 'id',
      name: 'new name',
      description: 'new description',
    });

    expect(result).toBeUndefined();
    expect(repository.categories[0].name).toBe('new name');
    expect(repository.categories[0].description).toBe('new description');
  });
});
