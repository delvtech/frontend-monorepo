import { BytesLike } from "@ethersproject/bytes";
import { BigNumberish, ContractTransaction } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { ERC20 } from "src/types/ERC20";
import { Vault } from "src/types/Vault";

import { ONE_DAY_IN_SECONDS } from "src/time";
import { sortAddresses } from "src/helpers/sortAddresses";

interface SwapIn {
  poolId: BytesLike;
  assetInIndex: number;
  assetOutIndex: number;
  amount: BigNumberish;
  userData: BytesLike;
}
export enum SwapKind {
  GIVEN_IN,
  GIVEN_OUT,
}

interface FundManagement {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
}

export async function batchSwapIn(
  tokenInContract: ERC20,
  tokenOutContract: ERC20,
  poolId: string,
  sender: string,
  balancerVaultContract: Vault,
  swapInAmount: string,
  decimals?: number,
): Promise<ContractTransaction> {
  const tokenInAddress = tokenInContract.address;
  const tokenOutAddress = tokenOutContract.address;

  let tokenInDecimals = decimals;
  if (!decimals) {
    tokenInDecimals = await tokenInContract.decimals();
  }

  const tokens: string[] = sortAddresses([tokenInAddress, tokenOutAddress]);
  const assetInIndex = tokens.findIndex(
    (address) => address === tokenInAddress,
  );
  const assetOutIndex = tokens.findIndex(
    (address) => address === tokenOutAddress,
  );
  const amount = parseUnits(swapInAmount, tokenInDecimals);
  // have to set this to something
  const userData: BytesLike = poolId; //"0x00";

  // the series of swaps to perform, only one in this case.
  const swaps: SwapIn[] = [
    {
      poolId,
      // indicies from 'tokens', puttin FYTs in, getting base asset out.
      assetInIndex,
      assetOutIndex,
      amount,
      userData,
    },
  ];

  // trading with ourselves.  internal balance means internal to balancer.  we don't have anything
  // in there to start, but we'll keep whatever base assets we get from swapping in the balancer vault.
  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    recipient: sender,
    toInternalBalance: false,
  };

  // pool is receivin this one, so make it there's enough
  const limitTokenIn = amount;

  // performing a SwapIn, so we can specifiy exactly how much in and set the limit to that.
  // pool is sending sending this one, so the delta will be negative
  const limitTokenOut = amount;

  // limits of how much of each token is allowed to be traded.  order must be the same as 'tokens'
  const limits: BigNumberish[] = [limitTokenIn, limitTokenOut];

  // set a large deadline for now, it was being buggy.  time is in seconds.  must be an integer.
  const deadline = Math.round(Date.now() / 1000) + ONE_DAY_IN_SECONDS;

  const swapKind = SwapKind.GIVEN_IN;
  const swapReceipt = await balancerVaultContract.batchSwap(
    swapKind,
    swaps,
    tokens,
    funds,
    limits,
    deadline,
  );

  await swapReceipt.wait(1);
  return swapReceipt;
}
