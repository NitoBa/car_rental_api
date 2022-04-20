import { Car } from '../../../domain/entities/car';
import { Specification } from '../../../domain/entities/specification';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { InMemorySpecificationRepository } from '../../../tests/repositories/in-memory-specification-repository';
import { CreateSpecificationCarUseCase } from './create-specification-car-usecase';

const makeSut = () => {
  const specificationRepository = new InMemorySpecificationRepository();
  const carsRepository = new InMemoryCarsRepository();
  const sut = new CreateSpecificationCarUseCase(
    specificationRepository,
    carsRepository
  );

  return {
    sut,
    specificationRepository,
    carsRepository,
  };
};

describe('CreateSpecificationCarUsecase', () => {
  it('should not be able to create a new specification car to inexistent car', async () => {
    const { sut } = makeSut();

    const specificationId = 'specification-id';
    const carId = 'car-id';

    const response = sut.execute([specificationId], carId);

    await expect(response).rejects.toThrow('Car not found');
  });
  it('should not be able to create a new specification car to inexistent specification', async () => {
    const { sut, carsRepository } = makeSut();
    const carId = 'car-id';
    const specificationId = 'specification-id';

    const car = new Car();

    Object.assign(car, {
      id: carId,
    });

    carsRepository.cars.push(car);

    const response = sut.execute([specificationId], carId);

    await expect(response).rejects.toThrow('Specification not found');
  });

  it('should be able to create a new specification car', async () => {
    const { sut, carsRepository, specificationRepository } = makeSut();
    const carId = 'car-id';
    const specificationId = 'specification-id';

    const car = new Car();
    const spec = new Specification();

    Object.assign(spec, {
      id: specificationId,
    });

    Object.assign(car, {
      id: carId,
      specifications: [spec],
    });

    specificationRepository.specifications.push(spec);
    carsRepository.cars.push(car);

    const response = await sut.execute([specificationId], carId);

    expect(response).toBeUndefined();
    expect(carsRepository.cars[0].specifications[0].id).toBe(specificationId);
  });
});
