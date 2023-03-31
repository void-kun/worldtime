export default class Timezone {
  id: number;
  utc: string;
  utcOffset: number;
  timezone: string;
  country: string;
  city: string;

  constructor(
    id: number,
    utc: string,
    utcOffset: number,
    timezone: string,
    country: string,
    city: string
  ) {
    this.id = id;
    this.utc = utc;
    this.utcOffset = utcOffset;
    this.timezone = timezone;
    this.country = country;
    this.city = city;
    return this;
  }
}
