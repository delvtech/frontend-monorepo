import { ElementClient } from "src/client";
import { YieldSource } from "src/models/YieldSource";
import { Getter } from "./getter";

export class YieldSourceGetter implements Getter<YieldSource | null> {
  client: ElementClient;

  constructor(client: ElementClient) {
    this.client = client;
  }

  get(address: string): YieldSource | null {
    return new YieldSource({ address });
  }

  getAll(): YieldSource[] {
    return [];
  }
}
