import { QueryStatus } from "react-query";

/**
 * @deprecated
 */
export interface QueryBatchSwapCalcResults {
  result: [amountIn: string, amountOut: string] | undefined;
  // TBD
  status: QueryStatus;
}
