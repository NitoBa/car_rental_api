import { Car } from '../../../domain/entities/car';
import { InMemoryCarImagesRepository } from '../../../tests/repositories/in-memory-car-images-repository';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { UploadCarImageUsecase } from './upload-car-image-usecase';

const makeSut = () => {
  const carsRepository = new InMemoryCarsRepository();
  const carImageRepository = new InMemoryCarImagesRepository();
  const sut = new UploadCarImageUsecase(carImageRepository, carsRepository);
  return {
    sut,
    carsRepository,
    carImageRepository,
  };
};

describe('UploadCarImageUsecase', () => {
  it('should not be able to upload a car image to inexistent car', async () => {
    const { sut } = makeSut();
    const carId = 'car-id';
    const image = 'image-url';
    await expect(sut.execute(carId, image)).rejects.toThrow('Car not found');
  });

  it('should be able to upload a car image to a car', async () => {
    const { sut, carsRepository, carImageRepository } = makeSut();
    const carId = 'car-id';
    const image = 'image-url';

    const car = new Car();

    Object.assign(car, {
      id: carId,
    });

    carsRepository.cars.push(car);

    const response = await sut.execute(carId, image);

    expect(response).toBeUndefined();
    expect(carImageRepository.carImages.length).toBe(1);
    expect(carImageRepository.carImages[0].carId).toBe(carId);
  });
});
