import {
  ZapCurveLpInStruct,
  ZapInInfoStruct,
} from "@elementfi/core-typechain/dist/v1/ZapSwapCurve";
import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import { ONE_HOUR_IN_SECONDS } from "base/time";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import {
  getZapSwapCurvePath,
  ZapSwapCurvePathKind,
} from "elf/zaps/zapSwapCurve/path";
import { BigNumberish, ethers } from "ethers";
import { MainnetExtraAddresses } from "./addresses";

const emptyZapCurveIn: ZapCurveLpInStruct = {
  curvePool: ethers.constants.AddressZero,
  lpToken: ethers.constants.AddressZero,
  amounts: [0, 0],
  roots: [ethers.constants.AddressZero, ethers.constants.AddressZero],
  parentIdx: 0,
  minLpAmount: 0,
};

// To buy principal tokens
export interface ZapSwapCurveBuyInputs {
  info: ZapInInfoStruct;
  baseZap: ZapCurveLpInStruct;
  metaZap: ZapCurveLpInStruct;
  value: BigNumberish;
}

export function createZapSwapCurveBuyInputs(
  principalToken: PrincipalTokenInfo,
  inputToken: TokenInfo,
  amountIn: string,
  recipient: string | null | undefined,
  minAmountOut?: BigNumberish | undefined,
): ZapSwapCurveBuyInputs {
  const principalPool = getPoolInfoForPrincipalToken(principalToken.address);

  const path = getZapSwapCurvePath(principalToken, inputToken);

  const needsChildZap = path.kind === ZapSwapCurvePathKind.DoubleStep;

  const info: ZapInInfoStruct = {
    balancerPoolId: principalPool.extensions.poolId,
    recipient: recipient ?? ethers.constants.AddressZero,
    principalToken: principalToken.address,
    minPtAmount: minAmountOut ?? 0,
    deadline: Math.round(Date.now() / 1000) + ONE_HOUR_IN_SECONDS,
    needsChildZap,
  };

  if (amountIn === "")
    return {
      info,
      baseZap: emptyZapCurveIn,
      metaZap: emptyZapCurveIn,
      value: ethers.constants.Zero,
    };

  const amountInBn = ethers.utils.parseUnits(amountIn, inputToken.decimals);

  const value =
    inputToken.address === MainnetExtraAddresses.ethAddress
      ? amountInBn
      : ethers.constants.Zero;

  const baseZapAmounts = new Array<BigNumberish>(
    path.baseToken.extensions.poolAssets.length,
  ).fill(0);

  const idxOfInputInBasePool = path.baseToken.extensions.poolAssets.findIndex(
    (address) => address === inputToken.address,
  );

  if (idxOfInputInBasePool !== -1) {
    baseZapAmounts[idxOfInputInBasePool] = amountInBn;
  }

  const baseZap: ZapCurveLpInStruct = {
    curvePool: path.baseToken.extensions.pool,
    lpToken: path.baseToken.address,
    amounts: baseZapAmounts,
    roots: path.baseToken.extensions.poolAssets,
    parentIdx: 0, // irrelevant for baseZap
    minLpAmount: 0, // covered by minPtAmount in info
  };

  if (path.kind === ZapSwapCurvePathKind.SingleStep) {
    return { info, baseZap, metaZap: emptyZapCurveIn, value };
  }

  const metaZapAmounts = new Array<BigNumberish>(
    path.metaToken.extensions.poolAssets.length,
  ).fill(0);

  const idxOfInputInMetaPool = path.metaToken.extensions.poolAssets.findIndex(
    (address) => address === inputToken.address,
  );

  if (idxOfInputInMetaPool !== -1) {
    metaZapAmounts[idxOfInputInMetaPool] = amountInBn;
  }

  const parentIdx = path.baseToken.extensions.poolAssets.findIndex(
    (address) => address === path.metaToken.address,
  );
  const metaZap: ZapCurveLpInStruct = {
    curvePool: path.metaToken.extensions.pool,
    lpToken: path.metaToken.address,
    amounts: metaZapAmounts,
    roots: path.metaToken.extensions.poolAssets,
    parentIdx,
    minLpAmount: 0, // covered by minPtAmount in info
  };

  return { metaZap, baseZap, info, value };
}
