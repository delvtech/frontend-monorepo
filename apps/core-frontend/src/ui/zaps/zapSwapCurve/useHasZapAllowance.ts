import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import { TokenInfo } from "@elementfi/core-tokenlist";
import {
  CryptoAssetType,
  Erc20CryptoAsset,
} from "elf/crypto/CryptoAsset";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { ZapSwapCurveAddress } from "elf/zaps/zapSwapCurve/addresses";
import { parseUnits } from "ethers/lib/utils";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";

export function useHasZapAllowance(
  account: string | null | undefined,
  inputToken: TokenInfo,
  amountIn: string,
): boolean {
  const inputAsset = getCryptoAssetForToken(inputToken.address);

  const contract = (
    inputAsset.type === CryptoAssetType.ERC20PERMIT ||
    inputAsset.type === CryptoAssetType.ERC20
      ? (inputAsset as Erc20CryptoAsset).tokenContract
      : undefined
  ) as ERC20 | ERC20Permit | undefined;

  const result = useTokenAllowance(contract, account, ZapSwapCurveAddress);

  if (inputAsset.type === CryptoAssetType.ETHEREUM) {return true;}

  const { data: allowance } = result;
  if (!allowance || amountIn === "" || amountIn === "0") {return false;}

  const amountInBn = parseUnits(amountIn, inputToken.decimals);

  return allowance.gte(amountInBn);
}
