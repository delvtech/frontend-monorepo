import {
  BaseContract,
  BigNumber,
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
export interface MockPoolFactoryInterface extends utils.Interface {
  functions: {
    "create()": FunctionFragment;
    "getVault()": FunctionFragment;
    "isPoolFromFactory(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "create", values?: undefined): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isPoolFromFactory",
    values: [string],
  ): string;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
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
export interface MockPoolFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockPoolFactoryInterface;
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
    create(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getVault(overrides?: CallOverrides): Promise<[string]>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
  };
  create(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getVault(overrides?: CallOverrides): Promise<string>;
  isPoolFromFactory(pool: string, overrides?: CallOverrides): Promise<boolean>;
  callStatic: {
    create(overrides?: CallOverrides): Promise<string>;
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
    create(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    create(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
