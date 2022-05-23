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
export interface MockVaultInterface extends utils.Interface {
  functions: {
    "callExitPool(address,bytes32,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "callJoinPool(address,bytes32,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "callMinimalPoolSwap(address,(uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)": FunctionFragment;
    "getAuthorizer()": FunctionFragment;
    "getPoolTokens(bytes32)": FunctionFragment;
    "registerPool(uint8)": FunctionFragment;
    "registerTokens(bytes32,address[],address[])": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "callExitPool",
    values: [
      string,
      BytesLike,
      string,
      BigNumberish[],
      BigNumberish,
      BigNumberish,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "callJoinPool",
    values: [
      string,
      BytesLike,
      string,
      BigNumberish[],
      BigNumberish,
      BigNumberish,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "callMinimalPoolSwap",
    values: [string, SwapRequestStruct, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthorizer",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolTokens",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "registerPool",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "registerTokens",
    values: [BytesLike, string[], string[]],
  ): string;
  decodeFunctionResult(
    functionFragment: "callExitPool",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "callJoinPool",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "callMinimalPoolSwap",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuthorizer",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerPool",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerTokens",
    data: BytesLike,
  ): Result;
  events: {
    "PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])": EventFragment;
    "Swap(bytes32,address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "PoolBalanceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
}
export declare type PoolBalanceChangedEvent = TypedEvent<
  [string, string, string[], BigNumber[], BigNumber[]],
  {
    poolId: string;
    liquidityProvider: string;
    tokens: string[];
    deltas: BigNumber[];
    protocolFees: BigNumber[];
  }
>;
export declare type PoolBalanceChangedEventFilter =
  TypedEventFilter<PoolBalanceChangedEvent>;
export declare type SwapEvent = TypedEvent<
  [string, string, string, BigNumber],
  {
    poolId: string;
    tokenIn: string;
    tokenOut: string;
    amount: BigNumber;
  }
>;
export declare type SwapEventFilter = TypedEventFilter<SwapEvent>;
export interface MockVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockVaultInterface;
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
    callExitPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    callJoinPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    callMinimalPoolSwap(
      pool: string,
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getAuthorizer(overrides?: CallOverrides): Promise<[string]>;
    getPoolTokens(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [string[], BigNumber[]] & {
        tokens: string[];
        balances: BigNumber[];
      }
    >;
    registerPool(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    registerTokens(
      poolId: BytesLike,
      tokens: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  callExitPool(
    poolAddress: string,
    poolId: BytesLike,
    recipient: string,
    currentBalances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callJoinPool(
    poolAddress: string,
    poolId: BytesLike,
    recipient: string,
    currentBalances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callMinimalPoolSwap(
    pool: string,
    request: SwapRequestStruct,
    balanceTokenIn: BigNumberish,
    balanceTokenOut: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getAuthorizer(overrides?: CallOverrides): Promise<string>;
  getPoolTokens(
    poolId: BytesLike,
    overrides?: CallOverrides,
  ): Promise<
    [string[], BigNumber[]] & {
      tokens: string[];
      balances: BigNumber[];
    }
  >;
  registerPool(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
  registerTokens(
    poolId: BytesLike,
    tokens: string[],
    arg2: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    callExitPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    callJoinPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    callMinimalPoolSwap(
      pool: string,
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    getAuthorizer(overrides?: CallOverrides): Promise<string>;
    getPoolTokens(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<
      [string[], BigNumber[]] & {
        tokens: string[];
        balances: BigNumber[];
      }
    >;
    registerPool(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    registerTokens(
      poolId: BytesLike,
      tokens: string[],
      arg2: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])"(
      poolId?: BytesLike | null,
      liquidityProvider?: string | null,
      tokens?: null,
      deltas?: null,
      protocolFees?: null,
    ): PoolBalanceChangedEventFilter;
    PoolBalanceChanged(
      poolId?: BytesLike | null,
      liquidityProvider?: string | null,
      tokens?: null,
      deltas?: null,
      protocolFees?: null,
    ): PoolBalanceChangedEventFilter;
    "Swap(bytes32,address,address,uint256)"(
      poolId?: BytesLike | null,
      tokenIn?: string | null,
      tokenOut?: string | null,
      amount?: null,
    ): SwapEventFilter;
    Swap(
      poolId?: BytesLike | null,
      tokenIn?: string | null,
      tokenOut?: string | null,
      amount?: null,
    ): SwapEventFilter;
  };
  estimateGas: {
    callExitPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    callJoinPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    callMinimalPoolSwap(
      pool: string,
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getAuthorizer(overrides?: CallOverrides): Promise<BigNumber>;
    getPoolTokens(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    registerPool(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    registerTokens(
      poolId: BytesLike,
      tokens: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    callExitPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    callJoinPool(
      poolAddress: string,
      poolId: BytesLike,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    callMinimalPoolSwap(
      pool: string,
      request: SwapRequestStruct,
      balanceTokenIn: BigNumberish,
      balanceTokenOut: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getAuthorizer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getPoolTokens(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    registerPool(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    registerTokens(
      poolId: BytesLike,
      tokens: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
