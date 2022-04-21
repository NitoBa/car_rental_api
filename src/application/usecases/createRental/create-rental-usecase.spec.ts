import { Car } from '../../../domain/entities/car';
import { Rental } from '../../../domain/entities/rental';
import { User } from '../../../domain/entities/user';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { InMemoryHandleDateRepository } from '../../../tests/repositories/in-memory-handle-date-repository';
import { InMemoryRentalRepository } from '../../../tests/repositories/in-memory-rental-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { CreateRentalUsecase } from './create-rental-usecase';

const makeSutWithDefaultValues = () => {
  const handleDateRepository = new InMemoryHandleDateRepository();

  const userRepository = new InMemoryUserRepository();
  const carsRepository = new InMemoryCarsRepository();
  const rentalRepository = new InMemoryRentalRepository();
  const sut = new CreateRentalUsecase(
    rentalRepository,
    carsRepository,
    userRepository,
    handleDateRepository
  );
  const car = new Car();
  const user = new User();
  const userId = 'user-id';
  const carId = 'car-id';

  Object.assign(car, {
    id: carId,
    available: true,
  });
  Object.assign(user, {
    id: userId,
  });

  carsRepository.cars.push(car);
  userRepository.users.push(user);

  return {
    sut,
    userRepository,
    carsRepository,
    rentalRepository,
    handleDateRepository,
  };
};

const makeSut = () => {
  const handleDateRepository = new InMemoryHandleDateRepository();
  const userRepository = new InMemoryUserRepository();
  const carsRepository = new InMemoryCarsRepository();
  const rentalRepository = new InMemoryRentalRepository();
  const sut = new CreateRentalUsecase(
    rentalRepository,
    carsRepository,
    userRepository,
    handleDateRepository
  );

  return {
    sut,
    userRepository,
    carsRepository,
    handleDateRepository,
  };
};

describe('CreateRentalUsecase', () => {
  it('Should not be able to create a new rental without parameters', async () => {
    const { sut } = makeSut();

    const rental = sut.execute({
      userId: '',
      carId: '',
      expectReturnDate: undefined,
    });

    await expect(rental).rejects.toThrow('Missing parameters');
  });

  it('Should not be able to create a new rental to inexistent car', async () => {
    const { sut } = makeSut();

    const rental = sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    await expect(rental).rejects.toThrow(
      'The Car with this id: car-id not found'
    );
  });

  it('Should not be able to create a new rental to unavailable car', async () => {
    const { sut, carsRepository } = makeSutWithDefaultValues();

    carsRepository.cars[0].available = false;

    const rental = sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    await expect(rental).rejects.toThrow(
      'The Car with this id: car-id is not available'
    );
  });

  it('Should not be able to create a new rental to inexistent user', async () => {
    const { sut, carsRepository } = makeSut();

    const car = new Car();
    const carId = 'car-id';

    Object.assign(car, {
      id: carId,
      available: true,
    });
    carsRepository.cars.push(car);

    const rental = sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    await expect(rental).rejects.toThrow(
      'The User with this id: user-id not found'
    );
  });

  it('Should not be able to create a new rental if exists one open to user', async () => {
    const { sut, rentalRepository } = makeSutWithDefaultValues();

    const rental = new Rental();

    Object.assign(rental, {
      userId: 'user-id',
      carId: 'car-id',
      endDate: null,
    });

    rentalRepository.rentals.push(rental);

    const response = sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    await expect(response).rejects.toThrow(
      'The User with this id: user-id already has an open rental'
    );
  });

  it('Should not be able to create a new rental if exists one open to car', async () => {
    const { sut, rentalRepository, userRepository } =
      makeSutWithDefaultValues();

    const rental = new Rental();

    Object.assign(rental, {
      userId: 'user-id',
      carId: 'car-id',
      endDate: null,
    });

    rentalRepository.rentals.push(rental);

    const user = new User();
    user.id = 'user-id-available';

    userRepository.users.push(user);

    const response = sut.execute({
      userId: 'user-id-available',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    await expect(response).rejects.toThrow(
      'The Car with this id: car-id already has an open rental'
    );
  });

  it('Should not able to create a new rental if expected date more than 24 hours', async () => {
    const { sut } = makeSutWithDefaultValues();

    const date = new Date(new Date().getTime() + 1000 * 60 * 60 * 72);

    const rental = sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: date,
    });

    await expect(rental).rejects.toThrow(
      'The expected return date must be at least 24 hours from now'
    );
  });

  it('Should able to create a new rental', async () => {
    const { sut } = makeSutWithDefaultValues();
    const rental = await sut.execute({
      userId: 'user-id',
      carId: 'car-id',
      expectReturnDate: new Date(),
    });

    expect(rental).toBeTruthy();
    expect(rental).toHaveProperty('id');
    expect(rental.userId).toBe('user-id');
    expect(rental.carId).toBe('car-id');
  });
});
