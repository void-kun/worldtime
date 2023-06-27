import Timezone from '@/models/Timezone';
import Response from '@/models/Response';

import { IApiClient } from '@/api/http';
import { API_PATH } from '@/utils/constants';
import { log } from '@/config/logger';

/**
 * ITimezoneAPIClient: Interface timezone service
 */
export interface ITimezoneAPIClient {
  gets(placeOrTimezone: string): Promise<Timezone[]>;
  get(): Promise<Timezone>;
}

/**
 * TimezoneService: Class timezone service
 */
export default class TimezoneService implements ITimezoneAPIClient {
  private serviceUrl: string;
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.serviceUrl = API_PATH.TIMEZ;
    this.apiClient = apiClient;
  }

  async gets(placeOrTimezone: string): Promise<Timezone[]> {
    let timezones: Timezone[] = [];
    try {
      await this.apiClient
        .get<Response<Timezone[]>>(this.serviceUrl, {
          params: { placeOrTimezone: placeOrTimezone },
        })
        .then((res) => (timezones = res.data));
    } catch (err) {
      log(`Error getting timezone from ${API_PATH}: ${err}`);
    }
    return timezones;
  }

  get(): Promise<Timezone> {
    throw new Error('Method not implemented.');
  }
}
