export interface ICarImageRepository {
  uploadCarImage(carId: string, image: string): Promise<void>;
}
