import Timezone from '@/models/Timezone';

export default class Timeline extends Timezone {
  hourLine: number[];

  constructor(
    id: number,
    utc: string,
    utcOffset: number,
    timezone: string,
    country: string,
    city: string
  ) {
    super(id, utc, utcOffset, timezone, country, city);
    this.hourLine = [];
  }
}
