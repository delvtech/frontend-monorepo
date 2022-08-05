import { CoreV2Context } from "src/context";
import { MultiPool, YieldSource } from "src/generated";

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

export const MultiPoolModel = {
  getByYieldSource,
};
