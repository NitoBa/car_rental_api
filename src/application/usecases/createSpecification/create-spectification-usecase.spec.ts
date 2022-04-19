import { Specification } from '../../../domain/entities/specification';
import { InMemorySpecificationRepository } from '../../../tests/repositories/in-memory-specification-repository';
import { CreateSpecificationUsecase } from './create-specification-usecase';

const makeSut = () => {
  const repository = new InMemorySpecificationRepository();
  const sut = new CreateSpecificationUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Create Specification Usecase', () => {
  it('should not be able to create a specification if already exists', async () => {
    const { sut, repository } = makeSut();
    const category: Specification = {
      id: 'id',
      name: 'name',
      description: 'description',
      createdAt: new Date(),
    };

    repository.specifications.push(category);

    const result = sut.execute({
      name: 'name',
      description: 'description',
    });

    await expect(result).rejects.toThrow('Specification already exists');
  });

  it('should be able to create a category', async () => {
    const { sut, repository } = makeSut();

    const result = await sut.execute({
      name: 'name',
      description: 'description',
    });

    expect(result).toBeUndefined();
    expect(repository.specifications.length).toBe(1);
    expect(repository.specifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'name',
        }),
      ])
    );
  });
});
