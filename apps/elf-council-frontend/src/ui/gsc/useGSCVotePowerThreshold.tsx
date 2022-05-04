import { QueryObserverResult } from "react-query";

import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { BigNumber } from "ethers";

import { gscVaultContract } from "src/elf/contracts";

export function useGSCVotePowerThreshold(): BigNumber {
  const { data: threshold } = useSmartContractReadCall(
    gscVaultContract,
    "votingPowerBound",
  );

  return threshold ?? BigNumber.from(0);
}
