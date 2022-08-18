import { CoreV2Context } from "src/context";
import { MultiTerm, YieldSource } from "src/generated";

export const MultiTermModel = {
  getByAddress,
  getByYieldSource,
};

interface GetByAddressOptions {
  address: string;
  context: CoreV2Context;
}

function getByAddress({ address, context }: GetByAddressOptions): MultiTerm {
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
}: GetByYieldSourceOptions): MultiTerm {
  // TODO: look up multiterm by yield source name using registry
  return {
    address: "0x1",
    yieldSource,
  };
}
