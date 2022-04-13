import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import {
  PrincipalPoolTokenInfo,
  TokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/tokenlist";
import { sortAddresses } from "@elementfi/base/utils/sortAddresses/sortAddresses";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { underlyingContractsByAddress } from "@elementfi/core/underlying/underlying";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { interestTokenContractsByAddress } from "@elementfi/core/interestToken/interestToken";
import { trancheContractsByAddress } from "@elementfi/core/tranche/tranches";

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

  const termAssetContract =
    // tranches don't have all the ERC20 methods on them, so we must cast for this case
    (trancheContractsByAddress[termAssetAddress] as unknown as ERC20) ||
    interestTokenContractsByAddress[termAssetAddress];

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
