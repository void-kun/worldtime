export default class Response<T> {
  data: T;
  error: string;
  timestamp: number;

  constructor(data: T, error: string, timestamp: number) {
    this.data = data;
    this.error = error;
    this.timestamp = timestamp;
  }
}
