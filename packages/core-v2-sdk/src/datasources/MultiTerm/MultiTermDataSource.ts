import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";

export interface MultiTermDataSource {
  address: string;
  yieldSource: YieldSourceDataSource;
}
