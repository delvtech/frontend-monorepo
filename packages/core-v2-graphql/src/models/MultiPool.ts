import { CoreV2Context } from "src/context";
import { MultiPool, YieldSource } from "src/generated";

export const MultiPoolModel = {
  getByAddress,
  getByYieldSource,
};

interface GetByAddressOptions {
  address: string;
  context: CoreV2Context;
}

function getByAddress({ address, context }: GetByAddressOptions): MultiPool {
  // TODO: look up multipool by yield source name
  return {
    address,
  };
}

interface GetByYieldSourceOptions {
  yieldSource: YieldSource;
  context: CoreV2Context;
}

function getByYieldSource({
  yieldSource,
  context,
}: GetByYieldSourceOptions): MultiPool {
  // TODO: look up multipool by yield source name
  return {
    address: "0x1",
    yieldSource,
  };
}
