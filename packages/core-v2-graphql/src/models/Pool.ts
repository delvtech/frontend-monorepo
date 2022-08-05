import { CoreV2Context } from "src/context";
import { Pool, YieldSource } from "src/generated";
import { MultiPoolModel } from "./MultiPool";

interface GetByYieldSourceOptions {
  maturity: string;
  yieldSource: YieldSource;
  context: CoreV2Context;
}

function getByMaturity({
  maturity,
  yieldSource,
  context,
}: GetByYieldSourceOptions): Pool | undefined {
  const multiPool = MultiPoolModel.getByYieldSource({
    yieldSource,
    context,
  });

  if (!multiPool) {
    return undefined;
  }

  // TODO: look up pool by yield source name and maturity
  return {
    id: "1",
    multiPool,
    maturity,
    yieldSource,
  };
}

export const PoolModel = {
  getByMaturity,
};
