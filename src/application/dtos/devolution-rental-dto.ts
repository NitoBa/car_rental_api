export type InputDevolutionRentalDTO = {
  rentalId: string;
  userId: string;
};

export type OutputDevolutionRentalDTO = {
  rentalId: string;
  userId: string;
  carId: string;
  startDate: Date;
  expectReturnDate: Date;
  totalPrice: number;
};
