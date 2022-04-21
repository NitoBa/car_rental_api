import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IHandleDateRepository } from '../../application/repositories/handle-date-repository';

dayjs.extend(utc);

export class HandleDateRepositoryDayJs implements IHandleDateRepository {
  isMoreThan24Hours(date1: Date): boolean {
    const comparedDateUTC = dayjs(date1).utc().local().format();

    const nowUTC = dayjs().utc().local().format();

    const isMoreThan24Hours = dayjs(comparedDateUTC).diff(nowUTC, 'hours');

    return isMoreThan24Hours > 24;
  }
}
