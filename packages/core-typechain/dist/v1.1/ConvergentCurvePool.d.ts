import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type SwapRequestStruct = {
  kind: BigNumberish;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumberish;
  poolId: BytesLike;
  lastChangeBlock: BigNumberish;
  from: string;
  to: string;
  userData: BytesLike;
};
export declare type SwapRequestStructOutput = [
  number,
  string,
  string,
  BigNumber,
  string,
  BigNumber,
  string,
  string,
  string,
] & {
  kind: number;
  tokenIn: string;
  tokenOut: string;
  amount: BigNumber;
  poolId: string;
  lastChangeBlock: BigNumber;
  from: string;
  to: string;
  userData: string;
};
export interface ConvergentCurvePoolInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "FEE_BOUND()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "bond()": FunctionFragment;
    "bondDecimals()": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "expiration()": FunctionFragment;
    "feesBond()": FunctionFragment;
    "feesUnderlying()": FunctionFragment;
    "getPoolId()": FunctionFragment;
    "getVault()": FunctionFragment;
    "governance()": FunctionFragment;
    "governanceFeesBond()": FunctionFragment;
    "governanceFeesUnderlying()": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "onExitPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onJoinPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)": FunctionFragment;
    "pause(bool)": FunctionFragment;
    "paused()": FunctionFragment;
    "pausers(address)": FunctionFragment;
    "percentFee()": FunctionFragment;
    "percentFeeGov()": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "setPauser(address,bool)": FunctionFragment;
    "solveTradeInvariant(uint256,uint256,uint256,bool)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "underlying()": FunctionFragment;
    "underlyingDecimals()": FunctionFragment;
    "unitSeconds()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "FEE_BOUND", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "bond", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "bondDecimals",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "expiration",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "feesBond", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feesUnderlying",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getPoolId", values?: undefined): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "governanceFeesBond",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "governanceFeesUnderlying",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "increaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(
    functionFragment: "onExitPool",
    values: [
      BytesLike,
      string,
      string,
      BigNumberish[],
      BigNumberish,
      BigNumberish,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "onJoinPool",
    values: [
      BytesLike,
      string,
      string,
      BigNumberish[],
      BigNumberish,
      BigNumberish,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "onSwap",
    values: [SwapRequestStruct, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "pause", values: [boolean]): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "pausers", values: [string]): string;
  encodeFunctionData(
    functionFragment: "percentFee",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "percentFeeGov",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "setPauser",
    values: [string, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "solveTradeInvariant",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean],
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "underlying",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "underlyingDecimals",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "unitSeconds",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "FEE_BOUND", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bond", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bondDecimals",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "expiration", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feesBond", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feesUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getPoolId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "governanceFeesBond",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceFeesUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onExitPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onJoinPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pausers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "percentFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "percentFeeGov",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPauser", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "solveTradeInvariant",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "underlyingDecimals",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "unitSeconds",
    data: BytesLike,
  ): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "FeeCollection(uint256,uint256,uint256,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeCollection"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type FeeCollectionEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  {
    collectedBase: BigNumber;
    collectedBond: BigNumber;
    remainingBase: BigNumber;
    remainingBond: BigNumber;
  }
>;
export declare type FeeCollectionEventFilter =
  TypedEventFilter<FeeCollectionEvent>;
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface ConvergentCurvePool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ConvergentCurvePoolInterface;
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
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
    FEE_BOUND(overrides?: CallOverrides): Promise<[BigNumber]>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    bond(overrides?: CallOverrides): Promise<[string]>;
    bondDecimals(overrides?: CallOverrides): Promise<[number]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    expiration(overrides?: CallOverrides): Promise<[BigNumber]>;
    feesBond(overrides?: CallOverrides): Promise<[BigNumber]>;
    feesUnderlying(overrides?: CallOverrides): Promise<[BigNumber]>;
    getPoolId(overrides?: CallOverrides): Promise<[string]>;
    getVault(overrides?: CallOverrides): Promise<[string]>;
    governance(overrides?: CallOverrides): Promise<[string]>;
    governanceFeesBond(overrides?: CallOverrides): Promise<[BigNumber]>;
    governanceFeesUnderlying(overrides?: CallOverrides): Promise<[BigNumber]>;
    increaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      arg2: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    onJoinPool(
      poolId: BytesLike,
      arg1: string,
      recipient: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    onSwap(
      swapRequest: SwapRequestStruct,
      currentBalanceTokenIn: BigNumberish,
      currentBalanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
    pausers(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
    percentFee(overrides?: CallOverrides): Promise<[BigNumber]>;
    percentFeeGov(overrides?: CallOverrides): Promise<[BigNumber]>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setPauser(
      who: string,
      status: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    solveTradeInvariant(
      amountX: BigNumberish,
      reserveX: BigNumberish,
      reserveY: BigNumberish,
      out: boolean,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    underlying(overrides?: CallOverrides): Promise<[string]>;
    underlyingDecimals(overrides?: CallOverrides): Promise<[number]>;
    unitSeconds(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  FEE_BOUND(overrides?: CallOverrides): Promise<BigNumber>;
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  bond(overrides?: CallOverrides): Promise<string>;
  bondDecimals(overrides?: CallOverrides): Promise<number>;
  decimals(overrides?: CallOverrides): Promise<number>;
  decreaseApproval(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  expiration(overrides?: CallOverrides): Promise<BigNumber>;
  feesBond(overrides?: CallOverrides): Promise<BigNumber>;
  feesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
  getPoolId(overrides?: CallOverrides): Promise<string>;
  getVault(overrides?: CallOverrides): Promise<string>;
  governance(overrides?: CallOverrides): Promise<string>;
  governanceFeesBond(overrides?: CallOverrides): Promise<BigNumber>;
  governanceFeesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
  increaseApproval(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
  onExitPool(
    poolId: BytesLike,
    sender: string,
    arg2: string,
    currentBalances: BigNumberish[],
    arg4: BigNumberish,
    protocolSwapFee: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  onJoinPool(
    poolId: BytesLike,
    arg1: string,
    recipient: string,
    currentBalances: BigNumberish[],
    arg4: BigNumberish,
    protocolSwapFee: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  onSwap(
    swapRequest: SwapRequestStruct,
    currentBalanceTokenIn: BigNumberish,
    currentBalanceTokenOut: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  pause(
    pauseStatus: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
  pausers(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  percentFee(overrides?: CallOverrides): Promise<BigNumber>;
  percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setPauser(
    who: string,
    status: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  solveTradeInvariant(
    amountX: BigNumberish,
    reserveX: BigNumberish,
    reserveY: BigNumberish,
    out: boolean,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  symbol(overrides?: CallOverrides): Promise<string>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  underlying(overrides?: CallOverrides): Promise<string>;
  underlyingDecimals(overrides?: CallOverrides): Promise<number>;
  unitSeconds(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    FEE_BOUND(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    bond(overrides?: CallOverrides): Promise<string>;
    bondDecimals(overrides?: CallOverrides): Promise<number>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    expiration(overrides?: CallOverrides): Promise<BigNumber>;
    feesBond(overrides?: CallOverrides): Promise<BigNumber>;
    feesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
    getPoolId(overrides?: CallOverrides): Promise<string>;
    getVault(overrides?: CallOverrides): Promise<string>;
    governance(overrides?: CallOverrides): Promise<string>;
    governanceFeesBond(overrides?: CallOverrides): Promise<BigNumber>;
    governanceFeesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
    increaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      arg2: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[], BigNumber[]] & {
        amountsOut: BigNumber[];
        dueProtocolFeeAmounts: BigNumber[];
      }
    >;
    onJoinPool(
      poolId: BytesLike,
      arg1: string,
      recipient: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[], BigNumber[]] & {
        amountsIn: BigNumber[];
        dueProtocolFeeAmounts: BigNumber[];
      }
    >;
    onSwap(
      swapRequest: SwapRequestStruct,
      currentBalanceTokenIn: BigNumberish,
      currentBalanceTokenOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    pause(pauseStatus: boolean, overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    pausers(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    percentFee(overrides?: CallOverrides): Promise<BigNumber>;
    percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    setPauser(
      who: string,
      status: boolean,
      overrides?: CallOverrides,
    ): Promise<void>;
    solveTradeInvariant(
      amountX: BigNumberish,
      reserveX: BigNumberish,
      reserveY: BigNumberish,
      out: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    underlying(overrides?: CallOverrides): Promise<string>;
    underlyingDecimals(overrides?: CallOverrides): Promise<number>;
    unitSeconds(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): ApprovalEventFilter;
    "FeeCollection(uint256,uint256,uint256,uint256)"(
      collectedBase?: null,
      collectedBond?: null,
      remainingBase?: null,
      remainingBond?: null,
    ): FeeCollectionEventFilter;
    FeeCollection(
      collectedBase?: null,
      collectedBond?: null,
      remainingBase?: null,
      remainingBond?: null,
    ): FeeCollectionEventFilter;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): TransferEventFilter;
  };
  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    FEE_BOUND(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    bond(overrides?: CallOverrides): Promise<BigNumber>;
    bondDecimals(overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    expiration(overrides?: CallOverrides): Promise<BigNumber>;
    feesBond(overrides?: CallOverrides): Promise<BigNumber>;
    feesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
    getPoolId(overrides?: CallOverrides): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    governance(overrides?: CallOverrides): Promise<BigNumber>;
    governanceFeesBond(overrides?: CallOverrides): Promise<BigNumber>;
    governanceFeesUnderlying(overrides?: CallOverrides): Promise<BigNumber>;
    increaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      arg2: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    onJoinPool(
      poolId: BytesLike,
      arg1: string,
      recipient: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    onSwap(
      swapRequest: SwapRequestStruct,
      currentBalanceTokenIn: BigNumberish,
      currentBalanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
    pausers(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    percentFee(overrides?: CallOverrides): Promise<BigNumber>;
    percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setPauser(
      who: string,
      status: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    solveTradeInvariant(
      amountX: BigNumberish,
      reserveX: BigNumberish,
      reserveY: BigNumberish,
      out: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    underlying(overrides?: CallOverrides): Promise<BigNumber>;
    underlyingDecimals(overrides?: CallOverrides): Promise<BigNumber>;
    unitSeconds(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    FEE_BOUND(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    bond(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    bondDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    expiration(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    feesBond(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    feesUnderlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getPoolId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    governanceFeesBond(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    governanceFeesUnderlying(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    increaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      owner: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      arg2: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    onJoinPool(
      poolId: BytesLike,
      arg1: string,
      recipient: string,
      currentBalances: BigNumberish[],
      arg4: BigNumberish,
      protocolSwapFee: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    onSwap(
      swapRequest: SwapRequestStruct,
      currentBalanceTokenIn: BigNumberish,
      currentBalanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pausers(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    percentFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    percentFeeGov(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setPauser(
      who: string,
      status: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    solveTradeInvariant(
      amountX: BigNumberish,
      reserveX: BigNumberish,
      reserveY: BigNumberish,
      out: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    underlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    underlyingDecimals(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    unitSeconds(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
