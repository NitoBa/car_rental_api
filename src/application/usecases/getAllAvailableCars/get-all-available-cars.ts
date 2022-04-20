import { Car } from '../../../domain/entities/car';
import { ICarsRepository } from '../../repositories/icars-repository';

export class GetAllAvailableCarsUsecase {
  constructor(private readonly carsRepository: ICarsRepository) {}

  async execute(): Promise<Car[]> {
    return this.carsRepository.findAllAvailable();
  }
}
