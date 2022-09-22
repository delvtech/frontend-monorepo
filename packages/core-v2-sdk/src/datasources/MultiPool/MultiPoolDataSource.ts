import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";

export interface MultiPoolDataSource {
  address: string;
  multiTerm: MultiTermDataSource;
}
