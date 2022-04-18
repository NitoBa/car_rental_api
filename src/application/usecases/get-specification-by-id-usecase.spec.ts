import { Specification } from '../../domain/entities/specification';
import { InMemorySpecificationRepository } from '../../tests/repositories/in-memory-specification-repository';
import { GetAllSpecificationsUsecase } from './get-all-specifications-usecase';
import { GetSpecificationByIdUsecase } from './get-specification-by-id-usecase';

const makeSut = () => {
  const repository = new InMemorySpecificationRepository();
  const sut = new GetSpecificationByIdUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Get Specification By ID Usecase', () => {
  it('should return a specification when id is specified', async () => {
    const { sut } = makeSut();

    const specification = sut.execute('id');
    await expect(specification).rejects.toThrow('Specification not found');
  });

  it('should return a specification when id is specified', async () => {
    const { sut, repository } = makeSut();

    repository.specifications.push({
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
    });

    const specification = await sut.execute('id');

    expect(specification.id).toBe('id');
  });
});
