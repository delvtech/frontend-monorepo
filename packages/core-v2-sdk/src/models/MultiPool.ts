import { MultiTerm } from "./MultiTerm";

export interface MultiPoolFields {
  address: string;
  multiTerm: MultiTerm;
}

export class MultiPool {
  address: string;
  multiTerm: MultiTerm;

  constructor({ address, multiTerm }: MultiPoolFields) {
    this.address = address;
    this.multiTerm = multiTerm;
  }
}
