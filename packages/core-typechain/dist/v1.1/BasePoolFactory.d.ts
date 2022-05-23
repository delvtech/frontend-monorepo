import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface BasePoolFactoryInterface extends utils.Interface {
  functions: {
    "getVault()": FunctionFragment;
    "isPoolFromFactory(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isPoolFromFactory",
    values: [string],
  ): string;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isPoolFromFactory",
    data: BytesLike,
  ): Result;
  events: {
    "PoolCreated(address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
}
export declare type PoolCreatedEvent = TypedEvent<
  [string],
  {
    pool: string;
  }
>;
export declare type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;
export interface BasePoolFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BasePoolFactoryInterface;
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
    getVault(overrides?: CallOverrides): Promise<[string]>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
  };
  getVault(overrides?: CallOverrides): Promise<string>;
  isPoolFromFactory(pool: string, overrides?: CallOverrides): Promise<boolean>;
  callStatic: {
    getVault(overrides?: CallOverrides): Promise<string>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "PoolCreated(address)"(pool?: string | null): PoolCreatedEventFilter;
    PoolCreated(pool?: string | null): PoolCreatedEventFilter;
  };
  estimateGas: {
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
