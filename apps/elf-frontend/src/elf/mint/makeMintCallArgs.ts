import { UserProxy } from "@elementfi/core-typechain/dist/v1";
import { PermitCallData } from "base/fetchPermitData";
import {
  ContractMethodArgs,
  StaticContractMethodArgs,
} from "elf/contracts/types";
import { USER_PROXY_ETH_SENTINEL } from "elf/userProxy/address";
import { BigNumber, CallOverrides } from "ethers";

export function makeMintCallArgs(
  amount: BigNumber,
  baseAssetAddress: string,
  trancheUnlockTimestamp: number,
  positionAddress: string,
  permitCallData: PermitCallData[],
): StaticContractMethodArgs<UserProxy, "mint"> | undefined {
  if (
    !amount?.gt(0) ||
    !baseAssetAddress ||
    !trancheUnlockTimestamp ||
    !positionAddress
  ) {
    return undefined;
  }

  const ethValueOverride = getMintOverrides(baseAssetAddress, amount);

  const callArgs: ContractMethodArgs<UserProxy, "mint"> = [
    amount,
    baseAssetAddress,
    trancheUnlockTimestamp,
    positionAddress,
    permitCallData,
  ];
  if (ethValueOverride) {
    callArgs.push(ethValueOverride);
  }

  return callArgs;
}
function getMintOverrides(
  baseAssetAddress: string,
  amount: BigNumber,
): CallOverrides | undefined {
  // Don't send any eth in this transaction if the base asset is a different token.
  if (baseAssetAddress === USER_PROXY_ETH_SENTINEL) {
    return { value: amount };
  }
}
