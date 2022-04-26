import { Car } from '../../../domain/entities/car';
import { Rental } from '../../../domain/entities/rental';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { InMemoryHandleDateRepository } from '../../../tests/repositories/in-memory-handle-date-repository';
import { InMemoryRentalRepository } from '../../../tests/repositories/in-memory-rental-repository';
import { DevolutionRentalUsecase } from './devolution-rental-usecase';

const makeSut = () => {
  const carsRepository = new InMemoryCarsRepository();
  const rentalRepository = new InMemoryRentalRepository();
  const handleDateRepository = new InMemoryHandleDateRepository();
  const sut = new DevolutionRentalUsecase(
    carsRepository,
    rentalRepository,
    handleDateRepository
  );
  return {
    sut,
    carsRepository,
    rentalRepository,
    handleDateRepository,
  };
};

describe('DevolutionRentalUsecase', () => {
  it('should not be able to devolution a rental without parameters', async () => {
    const { sut } = makeSut();

    const result = sut.execute({
      rentalId: '',
      userId: '',
    });

    await expect(result).rejects.toThrow('Missing parameters');
  });

  it('should not be able to devolution a rental that not exists', async () => {
    const { sut } = makeSut();

    const result = sut.execute({
      rentalId: 'not-rental-id',
      userId: 'user-id',
    });

    await expect(result).rejects.toThrow('Rental not found');
  });

  it('should apply fine amount if there are delay', async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() - 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    const result = await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(result.totalPrice).toBe(150);
  });

  it("should not apply fine amount if there aren't delay", async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() + 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    const result = await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(result.totalPrice).toBe(100);
  });

  it('should return a total price of rental based on daily rate', async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() + 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    const result = await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(result.totalPrice).toBe(200);
  });

  it('should return a total price default if return expect date is no more than 1 day or equals 1 day', async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();
    startDate.setDate(startDate.getDate());

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() + 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    const result = await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(result.totalPrice).toBe(100);
  });

  it('should be able the car to be available when devolution a rental', async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();
    startDate.setDate(startDate.getDate());

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() + 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(carsRepository.cars[0].available).toBe(true);
  });

  it('should be able to set end date when devolution a rental happen', async () => {
    const { sut, rentalRepository, carsRepository } = makeSut();

    const car = new Car();
    car.id = 'car-id';
    car.dailyRate = '100';
    car.fineAmount = '10';

    carsRepository.cars.push(car);

    const rental = new Rental();

    const startDate = new Date();
    startDate.setDate(startDate.getDate());

    const expectReturnDate = new Date();
    expectReturnDate.setDate(expectReturnDate.getDate() + 5);

    Object.assign(rental, {
      id: 'rental-id',
      userId: 'user-id',
      carId: 'car-id',
      startDate,
      expectReturnDate,
    });

    rentalRepository.rentals.push(rental);

    await sut.execute({
      rentalId: 'rental-id',
      userId: 'user-id',
    });

    expect(rentalRepository.rentals[0].total).toBe(100);
    expect(rentalRepository.rentals[0].endDate).not.toBeNull();
  });
});
