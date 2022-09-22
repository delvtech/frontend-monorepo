import { ElementClient } from "src/client";

export interface Getter<T> {
  client: ElementClient;
  get: (...args: any[]) => T | Promise<T>;
  getAll: (...args: any[]) => T[] | Promise<NonNullable<T>[]>;
}
