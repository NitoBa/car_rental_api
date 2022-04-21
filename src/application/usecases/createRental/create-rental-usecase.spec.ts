import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { InMemoryRentalRepository } from '../../../tests/repositories/in-memory-rental-repository';
import { InMemoryUserRepository } from '../../../tests/repositories/in-memory-user-repository';
import { CreateRentalUsecase } from './create-rental-usecase';

const makeSut = () => {
  const userRepository = new InMemoryUserRepository();
  const carsRepository = new InMemoryCarsRepository();
  const rentalRepository = new InMemoryRentalRepository();
  const sut = new CreateRentalUsecase(
    rentalRepository,
    carsRepository,
    userRepository
  );

  return {
    sut,
    userRepository,
    carsRepository,
  };
};

describe('CreateRentalUsecase', () => {
  it('Should not be able to create a new rental without parameters', async () => {
    const { sut } = makeSut();

    const rental = sut.execute({
      userId: '',
      carId: '',
      startDate: undefined,
      expectReturnDate: undefined,
    });

    await expect(rental).rejects.toThrow('Missing parameters');
  });
});
