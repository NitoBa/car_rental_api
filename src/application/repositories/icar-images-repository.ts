export interface ICarImageRepository {
  uploadCarImage(carId: string, images: string[]): Promise<void>;
}
