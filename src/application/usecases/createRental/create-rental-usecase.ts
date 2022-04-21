import { CreateRentalDTO } from '../../dtos/create-rental-dto';
import { ICarsRepository } from '../../repositories/icars-repository';
import { IRentalRepository } from '../../repositories/irental-repository';
import { IUsersRepository } from '../../repositories/iusers-repository';

export class CreateRentalUsecase {
  constructor(
    private readonly rentalRepository: IRentalRepository,
    private readonly carsRepository: ICarsRepository,
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(input: CreateRentalDTO): Promise<void> {
    const { carId, userId, expectReturnDate, startDate } = input;

    if (!carId || !userId || !expectReturnDate || !startDate) {
      throw new Error('Missing parameters');
    }
  }
}
