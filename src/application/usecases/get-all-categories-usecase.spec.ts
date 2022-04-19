import { InMemoryCategoryRepository } from '../../tests/repositories/in-memory-category-repository';
import { GetAllCategoriesUsecase } from './get-all-categories-usecase';

const makeSut = () => {
  const repository = new InMemoryCategoryRepository();
  const sut = new GetAllCategoriesUsecase(repository);
  return {
    sut,
    repository,
  };
};
describe('Get All Categories Usecase', () => {
  it('should return zero categories if there are no categories', async () => {
    const { sut } = makeSut();
    const categories = await sut.execute();

    expect(categories.length).toBe(0);
  });

  it('should return a list of categories', async () => {
    const { sut, repository } = makeSut();

    await repository.create({
      name: 'name',
      description: 'description',
    });

    await repository.create({
      name: 'name2',
      description: 'description2',
    });

    const categories = await sut.execute();

    expect(categories.length).toBe(2);
  });
});
