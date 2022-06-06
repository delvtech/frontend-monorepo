import {
  ERC20,
  ERC20__factory,
} from "@elementfi/core-typechain/dist/libraries";
import {
  PrincipalPoolTokenInfo,
  TokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/core-tokenlist";
import { sortAddresses } from "base/sortAddresses/sortAddresses";
// TODO Replace
import { getSmartContractFromRegistry } from "elf/contracts/SmartContractsRegistry";
import { PoolInfo } from "elf/pools/PoolInfo";
import { getTokenInfo } from "tokenlists/tokenlists";
import { underlyingContractsByAddress } from "elf/underlying/underlying";

interface PoolTokens {
  baseAssetInfo: TokenInfo;
  termAssetInfo: TokenInfo;
  baseAssetContract: ERC20;
  termAssetContract: ERC20;
  baseAssetIndex: number;
  termAssetIndex: number;
  sortedAddresses: [string, string];
}

export function getPoolTokens(poolInfo: PoolInfo): PoolTokens {
  const baseAssetAddress = poolInfo?.extensions.underlying;
  const termAssetAddress =
    (poolInfo as PrincipalPoolTokenInfo)?.extensions?.bond ??
    (poolInfo as YieldPoolTokenInfo)?.extensions?.interestToken;
  const baseAssetInfo = getTokenInfo(baseAssetAddress);
  const termAssetInfo = getTokenInfo(termAssetAddress);
  const baseAssetContract = underlyingContractsByAddress[
    baseAssetAddress
  ] as ERC20;
  const termAssetContract = getSmartContractFromRegistry(
    termAssetAddress,
    ERC20__factory.connect,
  ) as ERC20;

  const sortedAddresses = sortAddresses([
    baseAssetAddress,
    termAssetAddress,
  ]) as [string, string];

  const baseAssetIndex = sortedAddresses.findIndex(
    (address) => address === baseAssetAddress,
  );
  const termAssetIndex = sortedAddresses.findIndex(
    (address) => address === termAssetAddress,
  );

  return {
    baseAssetInfo,
    baseAssetContract,
    baseAssetIndex,
    termAssetInfo,
    termAssetContract,
    termAssetIndex,
    sortedAddresses,
  };
}
