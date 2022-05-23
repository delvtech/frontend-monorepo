import { Provider } from "@ethersproject/abstract-provider";
import {
  ERC20Permit__factory,
  OptimisticGrants__factory,
} from "elf-council-typechain";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { OptimisticsGrantsContractInfo } from "src/types";

export async function getOptimisticGrantsInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<OptimisticsGrantsContractInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const optimisticGrantsContract = OptimisticGrants__factory.connect(
    tokenAddress,
    provider,
  );

  const tokenPromise = optimisticGrantsContract.token();
  const solvencyPromise = optimisticGrantsContract.solvency();

  const [token, solvency] = await Promise.all([tokenPromise, solvencyPromise]);
  const tokenContract = ERC20Permit__factory.connect(tokenAddress, provider);
  const tokenDecimals = await tokenContract.decimals();

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      token,
      solvency: formatUnits(solvency, tokenDecimals),
    },
  };
}
