import { InMemorySpecificationRepository } from '../../tests/repositories/in-memory-specification-repository';
import { GetAllSpecificationsUsecase } from './get-all-specifications-usecase';

const makeSut = () => {
  const repository = new InMemorySpecificationRepository();
  const sut = new GetAllSpecificationsUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Get All Specifications Usecase', () => {
  it('should return a empty list of specifications if no exists', async () => {
    const { sut } = makeSut();

    const specifications = await sut.execute();

    expect(specifications.length).toBe(0);
  });

  it('should return a list of specifications if exists', async () => {
    const { sut, repository } = makeSut();

    await repository.create({
      name: 'name',
      description: 'description',
    });

    await repository.create({
      name: 'name2',
      description: 'description2',
    });

    const specifications = await sut.execute();

    expect(specifications.length).toBe(2);
  });
});
