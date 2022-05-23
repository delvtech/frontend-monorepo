import { QueryObserverResult } from "react-query";

import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { BigNumber } from "ethers";

import { gscVaultContract } from "src/elf/contracts";

export function useGSCVotePowerThreshold(): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(gscVaultContract, "votingPowerBound", {
    keepPreviousData: true,
  });
}
