import { AxiosInstance } from 'axios';
import BaseService from '@/services/base.service';
import Timezone from '@/models/Timezone';

import { guessAPI } from '@/config/http';
import { API_PATH } from '@/utils/constants';
import { log } from '@/config/logger';
import Response from '@/models/Response';

class TimezoneService implements BaseService<Timezone> {
  constructor(private http: AxiosInstance) {
    this.http = http;
  }

  async gets(placeOrTimezone: string): Promise<Timezone[]> {
    let timezones: Timezone[] = [];
    try {
      await this.http
        .get<Response<Timezone[]>>(API_PATH.TIMEZ, {
          params: { placeOrTimezone: placeOrTimezone },
        })
        .then((res) => res.data)
        .then((res) => {
          timezones = res.data;
        });
    } catch (err) {
      log(`Error getting timezone from ${API_PATH}: ${err}`);
    }
    return timezones;
  }

  get(): Promise<Timezone> {
    throw new Error('Method not implemented.');
  }
  insert(value: Timezone): Promise<Timezone> {
    console.log(value);
    throw new Error('Method not implemented.');
  }
  update(value: Timezone): Promise<Timezone> {
    console.log(value);
    throw new Error('Method not implemented.');
  }
  delete(value: Timezone): Promise<boolean> {
    console.log(value);
    throw new Error('Method not implemented.');
  }
}

const timezoneService = new TimezoneService(guessAPI);
export default timezoneService;
