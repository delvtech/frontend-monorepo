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
export declare type NewPoolParamsStruct = {
  vault: string;
  name: string;
  symbol: string;
  token0: string;
  token1: string;
  normalizedWeight0: BigNumberish;
  normalizedWeight1: BigNumberish;
  swapFeePercentage: BigNumberish;
  pauseWindowDuration: BigNumberish;
  bufferPeriodDuration: BigNumberish;
  oracleEnabled: boolean;
  owner: string;
};
export declare type NewPoolParamsStructOutput = [
  string,
  string,
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  string,
] & {
  vault: string;
  name: string;
  symbol: string;
  token0: string;
  token1: string;
  normalizedWeight0: BigNumber;
  normalizedWeight1: BigNumber;
  swapFeePercentage: BigNumber;
  pauseWindowDuration: BigNumber;
  bufferPeriodDuration: BigNumber;
  oracleEnabled: boolean;
  owner: string;
};
export declare type OracleAccumulatorQueryStruct = {
  variable: BigNumberish;
  ago: BigNumberish;
};
export declare type OracleAccumulatorQueryStructOutput = [number, BigNumber] & {
  variable: number;
  ago: BigNumber;
};
export declare type OracleAverageQueryStruct = {
  variable: BigNumberish;
  secs: BigNumberish;
  ago: BigNumberish;
};
export declare type OracleAverageQueryStructOutput = [
  number,
  BigNumber,
  BigNumber,
] & {
  variable: number;
  secs: BigNumber;
  ago: BigNumber;
};
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
export interface WeightedPool2TokensInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "enableOracle()": FunctionFragment;
    "getActionId(bytes4)": FunctionFragment;
    "getAuthorizer()": FunctionFragment;
    "getInvariant()": FunctionFragment;
    "getLargestSafeQueryWindow()": FunctionFragment;
    "getLastInvariant()": FunctionFragment;
    "getLatest(uint8)": FunctionFragment;
    "getMiscData()": FunctionFragment;
    "getNormalizedWeights()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getPastAccumulators((uint8,uint256)[])": FunctionFragment;
    "getPausedState()": FunctionFragment;
    "getPoolId()": FunctionFragment;
    "getRate()": FunctionFragment;
    "getSample(uint256)": FunctionFragment;
    "getSwapFeePercentage()": FunctionFragment;
    "getTimeWeightedAverage((uint8,uint256,uint256)[])": FunctionFragment;
    "getTotalSamples()": FunctionFragment;
    "getVault()": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "onExitPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onJoinPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "queryExit(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "queryJoin(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "setPaused(bool)": FunctionFragment;
    "setSwapFeePercentage(uint256)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "enableOracle",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getActionId",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthorizer",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getInvariant",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getLargestSafeQueryWindow",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getLastInvariant",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getLatest",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getMiscData",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getNormalizedWeights",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPastAccumulators",
    values: [OracleAccumulatorQueryStruct[]],
  ): string;
  encodeFunctionData(
    functionFragment: "getPausedState",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getPoolId", values?: undefined): string;
  encodeFunctionData(functionFragment: "getRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getSample",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapFeePercentage",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getTimeWeightedAverage",
    values: [OracleAverageQueryStruct[]],
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSamples",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
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
    functionFragment: "queryExit",
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
    functionFragment: "queryJoin",
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
  encodeFunctionData(functionFragment: "setPaused", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setSwapFeePercentage",
    values: [BigNumberish],
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
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "enableOracle",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActionId",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuthorizer",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInvariant",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLargestSafeQueryWindow",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLastInvariant",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getLatest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMiscData",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNormalizedWeights",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPastAccumulators",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPausedState",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getPoolId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSample", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSwapFeePercentage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimeWeightedAverage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSamples",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onExitPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onJoinPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "queryExit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "queryJoin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setPaused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSwapFeePercentage",
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
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "OracleEnabledChanged(bool)": EventFragment;
    "PausedStateChanged(bool)": EventFragment;
    "SwapFeePercentageChanged(uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleEnabledChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PausedStateChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapFeePercentageChanged"): EventFragment;
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
export declare type OracleEnabledChangedEvent = TypedEvent<
  [boolean],
  {
    enabled: boolean;
  }
>;
export declare type OracleEnabledChangedEventFilter =
  TypedEventFilter<OracleEnabledChangedEvent>;
export declare type PausedStateChangedEvent = TypedEvent<
  [boolean],
  {
    paused: boolean;
  }
>;
export declare type PausedStateChangedEventFilter =
  TypedEventFilter<PausedStateChangedEvent>;
export declare type SwapFeePercentageChangedEvent = TypedEvent<
  [BigNumber],
  {
    swapFeePercentage: BigNumber;
  }
>;
export declare type SwapFeePercentageChangedEventFilter =
  TypedEventFilter<SwapFeePercentageChangedEvent>;
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface WeightedPool2Tokens extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: WeightedPool2TokensInterface;
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
    decimals(overrides?: CallOverrides): Promise<[number]>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    enableOracle(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    getAuthorizer(overrides?: CallOverrides): Promise<[string]>;
    getInvariant(overrides?: CallOverrides): Promise<[BigNumber]>;
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<[BigNumber]>;
    getLastInvariant(overrides?: CallOverrides): Promise<[BigNumber]>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    getMiscData(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, boolean, BigNumber] & {
        logInvariant: BigNumber;
        logTotalSupply: BigNumber;
        oracleSampleCreationTimestamp: BigNumber;
        oracleIndex: BigNumber;
        oracleEnabled: boolean;
        swapFeePercentage: BigNumber;
      }
    >;
    getNormalizedWeights(overrides?: CallOverrides): Promise<[BigNumber[]]>;
    getOwner(overrides?: CallOverrides): Promise<[string]>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        results: BigNumber[];
      }
    >;
    getPausedState(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
    getPoolId(overrides?: CallOverrides): Promise<[string]>;
    getRate(overrides?: CallOverrides): Promise<[BigNumber]>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<[BigNumber]>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        results: BigNumber[];
      }
    >;
    getTotalSamples(overrides?: CallOverrides): Promise<[BigNumber]>;
    getVault(overrides?: CallOverrides): Promise<[string]>;
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
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    onJoinPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    onSwap(
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
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
    queryExit(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    queryJoin(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setSwapFeePercentage(
      swapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
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
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
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
  decimals(overrides?: CallOverrides): Promise<number>;
  decreaseApproval(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  enableOracle(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getActionId(selector: BytesLike, overrides?: CallOverrides): Promise<string>;
  getAuthorizer(overrides?: CallOverrides): Promise<string>;
  getInvariant(overrides?: CallOverrides): Promise<BigNumber>;
  getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
  getLastInvariant(overrides?: CallOverrides): Promise<BigNumber>;
  getLatest(
    variable: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  getMiscData(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, boolean, BigNumber] & {
      logInvariant: BigNumber;
      logTotalSupply: BigNumber;
      oracleSampleCreationTimestamp: BigNumber;
      oracleIndex: BigNumber;
      oracleEnabled: boolean;
      swapFeePercentage: BigNumber;
    }
  >;
  getNormalizedWeights(overrides?: CallOverrides): Promise<BigNumber[]>;
  getOwner(overrides?: CallOverrides): Promise<string>;
  getPastAccumulators(
    queries: OracleAccumulatorQueryStruct[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  getPausedState(overrides?: CallOverrides): Promise<
    [boolean, BigNumber, BigNumber] & {
      paused: boolean;
      pauseWindowEndTime: BigNumber;
      bufferPeriodEndTime: BigNumber;
    }
  >;
  getPoolId(overrides?: CallOverrides): Promise<string>;
  getRate(overrides?: CallOverrides): Promise<BigNumber>;
  getSample(
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
    ] & {
      logPairPrice: BigNumber;
      accLogPairPrice: BigNumber;
      logBptPrice: BigNumber;
      accLogBptPrice: BigNumber;
      logInvariant: BigNumber;
      accLogInvariant: BigNumber;
      timestamp: BigNumber;
    }
  >;
  getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
  getTimeWeightedAverage(
    queries: OracleAverageQueryStruct[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
  getVault(overrides?: CallOverrides): Promise<string>;
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
    recipient: string,
    balances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  onJoinPool(
    poolId: BytesLike,
    sender: string,
    recipient: string,
    balances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  onSwap(
    request: SwapRequestStruct,
    balanceTokenIn: BigNumberish,
    balanceTokenOut: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
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
  queryExit(
    poolId: BytesLike,
    sender: string,
    recipient: string,
    balances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  queryJoin(
    poolId: BytesLike,
    sender: string,
    recipient: string,
    balances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setPaused(
    paused: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setSwapFeePercentage(
    swapFeePercentage: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
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
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
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
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    enableOracle(overrides?: CallOverrides): Promise<void>;
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    getAuthorizer(overrides?: CallOverrides): Promise<string>;
    getInvariant(overrides?: CallOverrides): Promise<BigNumber>;
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
    getLastInvariant(overrides?: CallOverrides): Promise<BigNumber>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getMiscData(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, boolean, BigNumber] & {
        logInvariant: BigNumber;
        logTotalSupply: BigNumber;
        oracleSampleCreationTimestamp: BigNumber;
        oracleIndex: BigNumber;
        oracleEnabled: boolean;
        swapFeePercentage: BigNumber;
      }
    >;
    getNormalizedWeights(overrides?: CallOverrides): Promise<BigNumber[]>;
    getOwner(overrides?: CallOverrides): Promise<string>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    getPausedState(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
    getPoolId(overrides?: CallOverrides): Promise<string>;
    getRate(overrides?: CallOverrides): Promise<BigNumber>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<string>;
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
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[BigNumber[], BigNumber[]]>;
    onJoinPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[], BigNumber[]] & {
        amountsIn: BigNumber[];
        dueProtocolFeeAmounts: BigNumber[];
      }
    >;
    onSwap(
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
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
    queryExit(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber[]] & {
        bptIn: BigNumber;
        amountsOut: BigNumber[];
      }
    >;
    queryJoin(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber[]] & {
        bptOut: BigNumber;
        amountsIn: BigNumber[];
      }
    >;
    setPaused(paused: boolean, overrides?: CallOverrides): Promise<void>;
    setSwapFeePercentage(
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
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
    "OracleEnabledChanged(bool)"(
      enabled?: null,
    ): OracleEnabledChangedEventFilter;
    OracleEnabledChanged(enabled?: null): OracleEnabledChangedEventFilter;
    "PausedStateChanged(bool)"(paused?: null): PausedStateChangedEventFilter;
    PausedStateChanged(paused?: null): PausedStateChangedEventFilter;
    "SwapFeePercentageChanged(uint256)"(
      swapFeePercentage?: null,
    ): SwapFeePercentageChangedEventFilter;
    SwapFeePercentageChanged(
      swapFeePercentage?: null,
    ): SwapFeePercentageChangedEventFilter;
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
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    enableOracle(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getAuthorizer(overrides?: CallOverrides): Promise<BigNumber>;
    getInvariant(overrides?: CallOverrides): Promise<BigNumber>;
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
    getLastInvariant(overrides?: CallOverrides): Promise<BigNumber>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getMiscData(overrides?: CallOverrides): Promise<BigNumber>;
    getNormalizedWeights(overrides?: CallOverrides): Promise<BigNumber>;
    getOwner(overrides?: CallOverrides): Promise<BigNumber>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getPausedState(overrides?: CallOverrides): Promise<BigNumber>;
    getPoolId(overrides?: CallOverrides): Promise<BigNumber>;
    getRate(overrides?: CallOverrides): Promise<BigNumber>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
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
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    onJoinPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    onSwap(
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
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
    queryExit(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    queryJoin(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setSwapFeePercentage(
      swapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
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
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decreaseApproval(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    enableOracle(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getAuthorizer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getInvariant(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getLargestSafeQueryWindow(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getLastInvariant(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getMiscData(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getNormalizedWeights(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getPausedState(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getPoolId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getSwapFeePercentage(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getTotalSamples(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    onJoinPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    onSwap(
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
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
    queryExit(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    queryJoin(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      balances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setSwapFeePercentage(
      swapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
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
  };
}
