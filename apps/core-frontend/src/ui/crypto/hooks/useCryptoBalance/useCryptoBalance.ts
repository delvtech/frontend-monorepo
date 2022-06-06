import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useEthBalance } from "ui/wallets/hooks/useEthBalance/useEthBalance";
import { assertNever } from "base/assertNever";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";

export function useCryptoBalanceOf(
  library: Web3Provider | undefined,
  account: string | null | undefined,
  asset: CryptoAsset | undefined,
): BigNumber | undefined {
  const { data: ethBalance } = useEthBalance(library, account);

  const tokenContract = findTokenContract(asset);

  const { data: tokenBalance } = useSmartContractReadCall(
    tokenContract,
    "balanceOf",
    {
      callArgs: [account as string], // safe to cast because `enabled` is set
      enabled: !!account,
    },
  );

  if (!asset) {
    return;
  }

  const { type } = asset;

  switch (type) {
    case CryptoAssetType.ERC20:
    case CryptoAssetType.ERC20PERMIT:
      return tokenBalance;
    case CryptoAssetType.ETHEREUM:
      return ethBalance;
    default:
      assertNever(type);
      return undefined;
  }
}
