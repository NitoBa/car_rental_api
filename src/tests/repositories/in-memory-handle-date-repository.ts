import { IHandleDateRepository } from '../../application/repositories/handle-date-repository';

export class InMemoryHandleDateRepository implements IHandleDateRepository {
  isMoreThan24Hours(date1: Date): boolean {
    const comparedDateUTC = new Date(date1).toUTCString();

    const nowUTC = new Date().toUTCString();

    const isMoreThan24Hours =
      new Date(comparedDateUTC).getTime() - new Date(nowUTC).getTime();

    return isMoreThan24Hours > 24 * 60 * 60 * 1000; // 24 hours;
  }
}
