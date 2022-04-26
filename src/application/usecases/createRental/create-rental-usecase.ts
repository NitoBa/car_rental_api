import { Rental } from '../../../domain/entities/rental';
import { CreateRentalDTO } from '../../dtos/create-rental-dto';
import { IHandleDateRepository } from '../../repositories/handle-date-repository';
import { ICarsRepository } from '../../repositories/icars-repository';
import { IRentalRepository } from '../../repositories/irental-repository';
import { IUsersRepository } from '../../repositories/iusers-repository';

export class CreateRentalUsecase {
  constructor(
    private readonly rentalRepository: IRentalRepository,
    private readonly carsRepository: ICarsRepository,
    private readonly usersRepository: IUsersRepository,
    private readonly handleDate: IHandleDateRepository
  ) {}

  async execute(input: CreateRentalDTO): Promise<Rental> {
    const { carId, userId, expectReturnDate } = input;

    if (!carId || !userId || !expectReturnDate) {
      throw new Error('Missing parameters');
    }

    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new Error(`The Car with this id: ${carId} not found`);
    }

    if (!carExists.available) {
      throw new Error(`The Car with this id: ${carId} is not available`);
    }

    const userExists = await this.usersRepository.findUserById(userId);

    if (!userExists) {
      throw new Error(`The User with this id: ${userId} not found`);
    }

    const userUnavailable = await this.rentalRepository.findOpenByUserId(
      userId
    );

    if (userUnavailable) {
      throw new Error(
        `The User with this id: ${userId} already has an open rental`
      );
    }

    const carUnavailable = await this.rentalRepository.findOpenByCarId(carId);

    if (carUnavailable) {
      throw new Error(
        `The Car with this id: ${carId} already has an open rental`
      );
    }

    const isLessThan24Hours =
      this.handleDate.isMoreThan24Hours(expectReturnDate);

    if (isLessThan24Hours) {
      throw new Error(
        `The expected return date must be at least 24 hours from now`
      );
    }

    const rental = await this.rentalRepository.create({
      carId,
      userId,
      expectReturnDate,
    });

    await this.carsRepository.updateAvailableStatus(false, carId);

    return rental;
  }
}
