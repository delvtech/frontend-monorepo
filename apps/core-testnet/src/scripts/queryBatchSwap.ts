import { BigNumber, BigNumberish } from "ethers";
import { BytesLike, parseUnits } from "ethers/lib/utils";
import { sortAddresses } from "src/helpers/sortAddresses";
import { ERC20 } from "src/types/ERC20";
import { Vault } from "src/types/Vault";

interface Swap {
  poolId: BytesLike;
  assetInIndex: BigNumberish;
  assetOutIndex: BigNumberish;
  amount: BigNumberish;
  userData: BytesLike;
}

interface FundManagement {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
}

export async function queryBatchSwap(
  tokenInContract: ERC20,
  tokenOutContract: ERC20,
  poolId: string,
  sender: string,
  balancerVaultContract: Vault,
  swapInAmount: string,
): Promise<BigNumber[]> {
  const tokenInAddress = tokenInContract.address;
  const tokenOutAddress = tokenOutContract.address;
  const tokenInDecimals = await tokenInContract.decimals();

  const tokens: string[] = sortAddresses([tokenInAddress, tokenOutAddress]);
  const assetInIndex = tokens.findIndex(
    (address) => address === tokenInAddress,
  );
  const assetOutIndex = tokens.findIndex(
    (address) => address === tokenOutAddress,
  );
  const amount = parseUnits(swapInAmount, tokenInDecimals);
  // have to set this to something
  const userData: BytesLike = poolId;

  // the series of swaps to perform, only one in this case.
  const swaps: Swap[] = [
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

  const swapReceipt = await balancerVaultContract.callStatic.queryBatchSwap(
    SwapKind.GIVEN_IN,
    swaps,
    tokens,
    funds,
  );

  return swapReceipt;
}
enum SwapKind {
  GIVEN_IN,
  GIVEN_OUT,
}
