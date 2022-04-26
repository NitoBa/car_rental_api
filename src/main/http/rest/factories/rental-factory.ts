import { CreateRentalUsecase } from '../../../../application/usecases/createRental/create-rental-usecase';
import { DevolutionRentalUsecase } from '../../../../application/usecases/devolutionRental/devolution-rental-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { CarsRepositoryPrisma } from '../../../../infra/repositories/cars-repository-prisma';
import { HandleDateRepositoryDayJs } from '../../../../infra/repositories/handle-date-repository-dayjs';
import { RentalRepositoryPrisma } from '../../../../infra/repositories/rental-repository-prisma';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { CreateRentalController } from '../../../../presentation/controllers/create-rental-controller';
import { DevolutionRentalController } from '../../../../presentation/controllers/devolutionRental/devolution-rental-controller';

const handleDateRepository = new HandleDateRepositoryDayJs();
const carsRepository = new CarsRepositoryPrisma(prisma);
const usersRepository = new UsersRepositoryPrisma(prisma);
const rentalRepository = new RentalRepositoryPrisma(prisma);

export const createRentalController = () => {
  const usecase = new CreateRentalUsecase(
    rentalRepository,
    carsRepository,
    usersRepository,
    handleDateRepository
  );

  return new CreateRentalController(usecase);
};

export const createDevolutionRentalController = () => {
  const usecase = new DevolutionRentalUsecase(
    carsRepository,
    rentalRepository,
    handleDateRepository
  );

  return new DevolutionRentalController(usecase);
};
