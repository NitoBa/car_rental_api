export interface IHandleDateRepository {
  isMoreThan24Hours(date: Date): boolean;
  compareInDays(startDate: Date, endDate: Date): number;
}
