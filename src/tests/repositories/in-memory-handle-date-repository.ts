import { IHandleDateRepository } from '../../application/repositories/handle-date-repository';

export class InMemoryHandleDateRepository implements IHandleDateRepository {
  nowDate = new Date();
  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUTC = new Date(startDate).toUTCString();

    const endDateUTC = new Date(endDate).toUTCString();

    const compareInDays =
      new Date(endDateUTC).getTime() - new Date(startDateUTC).getTime();

    return compareInDays / (24 * 60 * 60 * 1000); // 24 hours;
  }

  isMoreThan24Hours(date1: Date): boolean {
    const comparedDateUTC = new Date(date1).toUTCString();

    const nowUTC = new Date().toUTCString();

    const isMoreThan24Hours =
      new Date(comparedDateUTC).getTime() - new Date(nowUTC).getTime();

    return isMoreThan24Hours > 24 * 60 * 60 * 1000; // 24 hours;
  }
}
