export interface IHandleDateRepository {
  isMoreThan24Hours(date: Date): boolean;
  compareInDays(startDate: Date, endDate: Date): number;
  compareInHours(startDate: Date, endDate: Date): number;
  addHours(hours: number): Date;
}
