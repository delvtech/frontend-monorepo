import { CoreV2Context } from "src/context";
import { MultiPool, Pool } from "src/generated";

export const PoolModel = {
  getByMaturity,
};

interface GetByMaturityOptions {
  maturity: string;
  multiPool: MultiPool;
  context: CoreV2Context;
}

function getByMaturity({
  maturity,
  multiPool,
  context,
}: GetByMaturityOptions): Pool | undefined {
  // TODO: look up pool by yield source name and maturity
  return {
    id: "1",
    multiPool,
    maturity,
  };
}
