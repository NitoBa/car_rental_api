import { CreateCarDTO } from '../../dtos/create-car-dto';
import { ICarsRepository } from '../../repositories/icars-repository';
import { ICategoryRepository } from '../../repositories/icategory-repository';

export class CreateCarUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreateCarDTO): Promise<void> {
    const {
      brand,
      category,
      name,
      description,
      fineAmount,
      licensePlate,
      dailyRate,
    } = input;

    if (
      !brand ||
      !category ||
      !name ||
      !description ||
      !fineAmount ||
      !licensePlate ||
      !dailyRate
    ) {
      throw new Error('Missing required fields');
    }
    if (dailyRate <= 0) {
      throw new Error(`Daily Rate must be greater than 0`);
    }

    if (fineAmount <= 0) {
      throw new Error(`Fine Amount must be greater than 0`);
    }

    const carWithSamePlate = await this.carsRepository.findByPlate(
      licensePlate
    );

    if (carWithSamePlate) {
      throw new Error('Car with the same plate already exists');
    }

    const categoryExists = await this.categoryRepository.findByName(category);

    if (!categoryExists) {
      throw new Error('Category not found');
    }

    await this.carsRepository.create({
      name,
      description,
      licensePlate,
      brand,
      category,
      fineAmount,
      dailyRate,
    });
  }
}
