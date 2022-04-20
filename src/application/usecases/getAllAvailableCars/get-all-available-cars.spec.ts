import { Car } from '../../../domain/entities/car';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { GetAllAvailableCarsUsecase } from './get-all-available-cars';

const makeSut = () => {
  const repository = new InMemoryCarsRepository();
  const sut = new GetAllAvailableCarsUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('GetAllAvailableCarsUsecase', () => {
  it('should return all available cars', async () => {
    const { sut, repository } = makeSut();

    const car = new Car();

    Object.assign(car, {
      available: true,
    });

    repository.cars.push(car);
    repository.cars.push(car);
    repository.cars.push(car);

    const cars = await sut.execute();

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          available: true,
        }),
      ])
    );
  });

  it('should not return cars if there are no available', async () => {
    const { sut } = makeSut();

    const cars = await sut.execute();

    expect(cars.length).toBe(0);
  });
});
