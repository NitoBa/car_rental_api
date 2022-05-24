import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IHandleDateRepository } from '../../application/repositories/handle-date-repository';

dayjs.extend(utc);

export class HandleDateRepositoryDayJs implements IHandleDateRepository {
  compareInHours(startDate: Date, endDate: Date): number {
    const endDataUTC = dayjs(endDate).utc().local().format();
    const startDateUTC = dayjs(startDate).utc().local().format();

    const compareInHours = dayjs(endDataUTC).diff(startDateUTC, 'hours');

    return compareInHours;
  }
  addHours(hours: number): Date {
    const now = dayjs().utc().local();

    const addedHours = now.add(hours, 'hours');

    return addedHours.toDate();
  }
  compareInDays(startDate: Date, endDate: Date): number {
    const endDataUTC = dayjs(endDate).utc().local().format();
    const startDateUTC = dayjs(startDate).utc().local().format();

    const compareInDays = dayjs(endDataUTC).diff(startDateUTC, 'days');

    return compareInDays;
  }
  isMoreThan24Hours(date1: Date): boolean {
    const comparedDateUTC = dayjs(date1).utc().local().format();

    const nowUTC = dayjs().utc().local().format();

    const isMoreThan24Hours = dayjs(comparedDateUTC).diff(nowUTC, 'hours');

    return isMoreThan24Hours > 24;
  }
}
