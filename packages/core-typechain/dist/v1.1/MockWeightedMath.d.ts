import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockWeightedMathInterface extends utils.Interface {
  functions: {
    "bptInForExactTokensOut(uint256[],uint256[],uint256[],uint256,uint256)": FunctionFragment;
    "calculateDueTokenProtocolSwapFeeAmount(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "exactBPTInForTokenOut(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "exactBPTInForTokensOut(uint256[],uint256,uint256)": FunctionFragment;
    "exactTokensInForBPTOut(uint256[],uint256[],uint256[],uint256,uint256)": FunctionFragment;
    "inGivenOut(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "invariant(uint256[],uint256[])": FunctionFragment;
    "outGivenIn(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "tokenInForExactBPTOut(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "bptInForExactTokensOut",
    values: [
      BigNumberish[],
      BigNumberish[],
      BigNumberish[],
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "calculateDueTokenProtocolSwapFeeAmount",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "exactBPTInForTokenOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "exactBPTInForTokensOut",
    values: [BigNumberish[], BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "exactTokensInForBPTOut",
    values: [
      BigNumberish[],
      BigNumberish[],
      BigNumberish[],
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "inGivenOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "invariant",
    values: [BigNumberish[], BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: "outGivenIn",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "tokenInForExactBPTOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  decodeFunctionResult(
    functionFragment: "bptInForExactTokensOut",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateDueTokenProtocolSwapFeeAmount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "exactBPTInForTokenOut",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "exactBPTInForTokensOut",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "exactTokensInForBPTOut",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "inGivenOut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "invariant", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "outGivenIn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenInForExactBPTOut",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface MockWeightedMath extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockWeightedMathInterface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    bptInForExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    calculateDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    exactBPTInForTokenOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    exactBPTInForTokensOut(
      currentBalances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber[]]>;
    exactTokensInForBPTOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    inGivenOut(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    invariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    outGivenIn(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountIn: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    tokenInForExactBPTOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  bptInForExactTokensOut(
    balances: BigNumberish[],
    normalizedWeights: BigNumberish[],
    amountsOut: BigNumberish[],
    bptTotalSupply: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  calculateDueTokenProtocolSwapFeeAmount(
    balance: BigNumberish,
    normalizedWeight: BigNumberish,
    previousInvariant: BigNumberish,
    currentInvariant: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  exactBPTInForTokenOut(
    tokenBalance: BigNumberish,
    tokenNormalizedWeight: BigNumberish,
    bptAmountIn: BigNumberish,
    bptTotalSupply: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  exactBPTInForTokensOut(
    currentBalances: BigNumberish[],
    bptAmountIn: BigNumberish,
    totalBPT: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  exactTokensInForBPTOut(
    balances: BigNumberish[],
    normalizedWeights: BigNumberish[],
    amountsIn: BigNumberish[],
    bptTotalSupply: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  inGivenOut(
    tokenBalanceIn: BigNumberish,
    tokenWeightIn: BigNumberish,
    tokenBalanceOut: BigNumberish,
    tokenWeightOut: BigNumberish,
    tokenAmountOut: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  invariant(
    normalizedWeights: BigNumberish[],
    balances: BigNumberish[],
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  outGivenIn(
    tokenBalanceIn: BigNumberish,
    tokenWeightIn: BigNumberish,
    tokenBalanceOut: BigNumberish,
    tokenWeightOut: BigNumberish,
    tokenAmountIn: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  tokenInForExactBPTOut(
    tokenBalance: BigNumberish,
    tokenNormalizedWeight: BigNumberish,
    bptAmountOut: BigNumberish,
    bptTotalSupply: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    bptInForExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calculateDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exactBPTInForTokenOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exactBPTInForTokensOut(
      currentBalances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    exactTokensInForBPTOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    inGivenOut(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    invariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    outGivenIn(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountIn: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    tokenInForExactBPTOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    bptInForExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calculateDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exactBPTInForTokenOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exactBPTInForTokensOut(
      currentBalances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exactTokensInForBPTOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    inGivenOut(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    invariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    outGivenIn(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountIn: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    tokenInForExactBPTOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    bptInForExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    calculateDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    exactBPTInForTokenOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    exactBPTInForTokensOut(
      currentBalances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    exactTokensInForBPTOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    inGivenOut(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    invariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    outGivenIn(
      tokenBalanceIn: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenBalanceOut: BigNumberish,
      tokenWeightOut: BigNumberish,
      tokenAmountIn: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    tokenInForExactBPTOut(
      tokenBalance: BigNumberish,
      tokenNormalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
