import { QueryObserverResult } from "react-query";

import { BigNumber } from "ethers";

export type UsePoolTokensQueryResult = QueryObserverResult<
  [
    // addresses
    string[],
    // balances
    BigNumber[],
    // lastChangeBlock
    BigNumber,
  ],
  unknown
>;
