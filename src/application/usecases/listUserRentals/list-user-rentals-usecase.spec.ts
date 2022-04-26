import { InMemoryRentalRepository } from '../../../tests/repositories/in-memory-rental-repository';
import { ListUserRentalsUsecase } from './list-user-rentals-usecase';

const makeSut = () => {
  const rentalRepository = new InMemoryRentalRepository();
  const sut = new ListUserRentalsUsecase(rentalRepository);
  return {
    sut,
    rentalRepository,
  };
};

describe('ListUserRentalsUsecase', () => {
  it('Should return a empty list when user has no rentals', async () => {
    const { sut } = makeSut();
    const rentals = await sut.execute('user-id');
    expect(rentals).toEqual([]);
  });

  it('Should return a list of rental of user', async () => {
    const { sut, rentalRepository } = makeSut();
    rentalRepository.rentals.push({
      id: 'id-1',
      userId: 'user-id',
      carId: 'car-id',
      startDate: new Date(),
      expectReturnDate: new Date(),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const rentals = await sut.execute('user-id');
    expect(rentals.length).toBe(1);
  });
});
