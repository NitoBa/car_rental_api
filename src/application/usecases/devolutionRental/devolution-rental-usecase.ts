import {
  InputDevolutionRentalDTO,
  OutputDevolutionRentalDTO,
} from '../../dtos/devolution-rental-dto';
import { IHandleDateRepository } from '../../repositories/handle-date-repository';
import { ICarsRepository } from '../../repositories/icars-repository';
import { IRentalRepository } from '../../repositories/irental-repository';

export class DevolutionRentalUsecase {
  constructor(
    private readonly carsRepository: ICarsRepository,
    private readonly rentalsRepository: IRentalRepository,
    private readonly handleDateRepository: IHandleDateRepository
  ) {}

  async execute({
    rentalId,
    userId,
  }: InputDevolutionRentalDTO): Promise<OutputDevolutionRentalDTO> {
    const minimumDays = 1;
    let totalPrice = 0;

    if (!rentalId || !userId) {
      throw new Error('Missing parameters');
    }

    const rentalExists = await this.rentalsRepository.findById(rentalId);

    if (!rentalExists) {
      throw new Error('Rental not found');
    }

    const car = await this.carsRepository.findById(rentalExists.carId);

    let rentalDays = this.handleDateRepository.compareInDays(
      rentalExists.startDate,
      new Date()
    );

    // Pagar apenas uma diária
    if (rentalDays <= 0) {
      rentalDays = minimumDays;
    }

    const delayDays = this.handleDateRepository.compareInDays(
      rentalExists.expectReturnDate,
      new Date()
    );

    if (delayDays > 0) {
      // Aplicar multa de atraso

      const totalFineAmount = delayDays * Number(car.fineAmount);
      totalPrice = Number(car.dailyRate) * rentalDays + totalFineAmount;
    } else {
      // Não aplicar multa de atraso
      totalPrice = Number(car.dailyRate) * rentalDays;
    }
    await this.rentalsRepository.updateStatues(rentalId, new Date());
    await this.carsRepository.updateAvailableStatus(true, car.id);

    return {
      rentalId,
      userId,
      carId: car.id,
      startDate: rentalExists.startDate,
      expectReturnDate: rentalExists.expectReturnDate,
      totalPrice,
    };
  }
}
