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
  it('should not be able to upload a car image without params', async () => {
    const { sut } = makeSut();
    const carId = '';
    const images = [];
    await expect(sut.execute(carId, images)).rejects.toThrow('Missing params');
  });
  it('should not be able to upload a car image to inexistent car', async () => {
    const { sut } = makeSut();
    const carId = 'car-id';
    const images = ['image-url'];
    await expect(sut.execute(carId, images)).rejects.toThrow('Car not found');
  });

  it('should be able to upload a car image to a car', async () => {
    const { sut, carsRepository, carImageRepository } = makeSut();
    const carId = 'car-id';
    const images = ['image-url'];

    const car = new Car();

    Object.assign(car, {
      id: carId,
    });

    carsRepository.cars.push(car);

    const response = await sut.execute(carId, images);

    expect(response).toBeUndefined();
    expect(carImageRepository.carImages.length).toBe(1);
    expect(carImageRepository.carImages[0].carId).toBe(carId);
  });

  it('should be able to upload multiples images to a car', async () => {
    const { sut, carsRepository, carImageRepository } = makeSut();
    const carId = 'car-id';
    const images = ['image-url1', 'image-url2', 'image-url3'];

    const car = new Car();

    Object.assign(car, {
      id: carId,
    });

    carsRepository.cars.push(car);

    const response = await sut.execute(carId, images);

    expect(response).toBeUndefined();
    expect(carImageRepository.carImages.length).toBe(3);
    expect(carImageRepository.carImages[0].carId).toBe(carId);
  });
});
