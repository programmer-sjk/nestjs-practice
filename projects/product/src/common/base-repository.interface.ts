export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  save(entity: T | T[]);
}
