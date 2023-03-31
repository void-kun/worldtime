export default interface BaseService<T> {
  gets(conditions: unknown): Promise<Array<T>>;
  get(): Promise<T>;
  insert(value: T): Promise<T>;
  update(value: T): Promise<T>;
  delete(value: T): Promise<boolean>;
}
