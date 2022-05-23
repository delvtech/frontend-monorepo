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
export interface MockPoolInterface extends utils.Interface {
  functions: {
    "deregisterTokens(address[])": FunctionFragment;
    "getPoolId()": FunctionFragment;
    "getVault()": FunctionFragment;
    "onExitPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onJoinPool(bytes32,address,address,uint256[],uint256,uint256,bytes)": FunctionFragment;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)": FunctionFragment;
    "registerTokens(address[],address[])": FunctionFragment;
    "setMultiplier(uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "deregisterTokens",
    values: [string[]],
  ): string;
  encodeFunctionData(functionFragment: "getPoolId", values?: undefined): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
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
    values: [SwapRequestStruct, BigNumberish[], BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "registerTokens",
    values: [string[], string[]],
  ): string;
  encodeFunctionData(
    functionFragment: "setMultiplier",
    values: [BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "deregisterTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getPoolId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onExitPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onJoinPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onSwap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMultiplier",
    data: BytesLike,
  ): Result;
  events: {
    "OnExitPoolCalled(bytes32,address,address,uint256[],uint256,uint256,bytes)": EventFragment;
    "OnJoinPoolCalled(bytes32,address,address,uint256[],uint256,uint256,bytes)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OnExitPoolCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OnJoinPoolCalled"): EventFragment;
}
export declare type OnExitPoolCalledEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber, BigNumber, string],
  {
    poolId: string;
    sender: string;
    recipient: string;
    currentBalances: BigNumber[];
    lastChangeBlock: BigNumber;
    protocolSwapFeePercentage: BigNumber;
    userData: string;
  }
>;
export declare type OnExitPoolCalledEventFilter =
  TypedEventFilter<OnExitPoolCalledEvent>;
export declare type OnJoinPoolCalledEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber, BigNumber, string],
  {
    poolId: string;
    sender: string;
    recipient: string;
    currentBalances: BigNumber[];
    lastChangeBlock: BigNumber;
    protocolSwapFeePercentage: BigNumber;
    userData: string;
  }
>;
export declare type OnJoinPoolCalledEventFilter =
  TypedEventFilter<OnJoinPoolCalledEvent>;
export interface MockPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockPoolInterface;
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
    deregisterTokens(
      tokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getPoolId(overrides?: CallOverrides): Promise<[string]>;
    getVault(overrides?: CallOverrides): Promise<[string]>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      currentBalances: BigNumberish[],
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
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish[],
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber] & {
        amount: BigNumber;
      }
    >;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    registerTokens(
      tokens: string[],
      assetManagers: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setMultiplier(
      newMultiplier: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  deregisterTokens(
    tokens: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getPoolId(overrides?: CallOverrides): Promise<string>;
  getVault(overrides?: CallOverrides): Promise<string>;
  onExitPool(
    poolId: BytesLike,
    sender: string,
    recipient: string,
    currentBalances: BigNumberish[],
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
    currentBalances: BigNumberish[],
    lastChangeBlock: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)"(
    swapRequest: SwapRequestStruct,
    arg1: BigNumberish[],
    arg2: BigNumberish,
    arg3: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)"(
    swapRequest: SwapRequestStruct,
    arg1: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  registerTokens(
    tokens: string[],
    assetManagers: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setMultiplier(
    newMultiplier: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    deregisterTokens(
      tokens: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
    getPoolId(overrides?: CallOverrides): Promise<string>;
    getVault(overrides?: CallOverrides): Promise<string>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
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
      sender: string,
      recipient: string,
      currentBalances: BigNumberish[],
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
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish[],
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    registerTokens(
      tokens: string[],
      assetManagers: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
    setMultiplier(
      newMultiplier: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "OnExitPoolCalled(bytes32,address,address,uint256[],uint256,uint256,bytes)"(
      poolId?: null,
      sender?: null,
      recipient?: null,
      currentBalances?: null,
      lastChangeBlock?: null,
      protocolSwapFeePercentage?: null,
      userData?: null,
    ): OnExitPoolCalledEventFilter;
    OnExitPoolCalled(
      poolId?: null,
      sender?: null,
      recipient?: null,
      currentBalances?: null,
      lastChangeBlock?: null,
      protocolSwapFeePercentage?: null,
      userData?: null,
    ): OnExitPoolCalledEventFilter;
    "OnJoinPoolCalled(bytes32,address,address,uint256[],uint256,uint256,bytes)"(
      poolId?: null,
      sender?: null,
      recipient?: null,
      currentBalances?: null,
      lastChangeBlock?: null,
      protocolSwapFeePercentage?: null,
      userData?: null,
    ): OnJoinPoolCalledEventFilter;
    OnJoinPoolCalled(
      poolId?: null,
      sender?: null,
      recipient?: null,
      currentBalances?: null,
      lastChangeBlock?: null,
      protocolSwapFeePercentage?: null,
      userData?: null,
    ): OnJoinPoolCalledEventFilter;
  };
  estimateGas: {
    deregisterTokens(
      tokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getPoolId(overrides?: CallOverrides): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      currentBalances: BigNumberish[],
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
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish[],
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    registerTokens(
      tokens: string[],
      assetManagers: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setMultiplier(
      newMultiplier: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    deregisterTokens(
      tokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getPoolId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    onExitPool(
      poolId: BytesLike,
      sender: string,
      recipient: string,
      currentBalances: BigNumberish[],
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
      currentBalances: BigNumberish[],
      lastChangeBlock: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256[],uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish[],
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    "onSwap((uint8,address,address,uint256,bytes32,uint256,address,address,bytes),uint256,uint256)"(
      swapRequest: SwapRequestStruct,
      arg1: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    registerTokens(
      tokens: string[],
      assetManagers: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setMultiplier(
      newMultiplier: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
