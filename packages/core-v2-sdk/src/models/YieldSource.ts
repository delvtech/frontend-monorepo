export enum Protocol {
  YEARN = "Yearn",
}

export interface YieldSourceOptions {
  address: string;
}

export class YieldSource {
  address: string;

  constructor({ address }: YieldSourceOptions) {
    this.address = address;
  }
}
