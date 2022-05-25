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
export interface WeightedPool2TokensFactoryInterface extends utils.Interface {
  functions: {
    "create(string,string,address[],uint256[],uint256,bool,address)": FunctionFragment;
    "getPauseConfiguration()": FunctionFragment;
    "getVault()": FunctionFragment;
    "isPoolFromFactory(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "create",
    values: [
      string,
      string,
      string[],
      BigNumberish[],
      BigNumberish,
      boolean,
      string,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "getPauseConfiguration",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isPoolFromFactory",
    values: [string],
  ): string;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPauseConfiguration",
    data: BytesLike,
  ): Result;
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
export interface WeightedPool2TokensFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: WeightedPool2TokensFactoryInterface;
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
      name: string,
      symbol: string,
      tokens: string[],
      weights: BigNumberish[],
      swapFeePercentage: BigNumberish,
      oracleEnabled: boolean,
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getPauseConfiguration(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber] & {
        pauseWindowDuration: BigNumber;
        bufferPeriodDuration: BigNumber;
      }
    >;
    getVault(overrides?: CallOverrides): Promise<[string]>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
  };
  create(
    name: string,
    symbol: string,
    tokens: string[],
    weights: BigNumberish[],
    swapFeePercentage: BigNumberish,
    oracleEnabled: boolean,
    owner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getPauseConfiguration(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber] & {
      pauseWindowDuration: BigNumber;
      bufferPeriodDuration: BigNumber;
    }
  >;
  getVault(overrides?: CallOverrides): Promise<string>;
  isPoolFromFactory(pool: string, overrides?: CallOverrides): Promise<boolean>;
  callStatic: {
    create(
      name: string,
      symbol: string,
      tokens: string[],
      weights: BigNumberish[],
      swapFeePercentage: BigNumberish,
      oracleEnabled: boolean,
      owner: string,
      overrides?: CallOverrides,
    ): Promise<string>;
    getPauseConfiguration(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber] & {
        pauseWindowDuration: BigNumber;
        bufferPeriodDuration: BigNumber;
      }
    >;
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
      name: string,
      symbol: string,
      tokens: string[],
      weights: BigNumberish[],
      swapFeePercentage: BigNumberish,
      oracleEnabled: boolean,
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getPauseConfiguration(overrides?: CallOverrides): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    create(
      name: string,
      symbol: string,
      tokens: string[],
      weights: BigNumberish[],
      swapFeePercentage: BigNumberish,
      oracleEnabled: boolean,
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getPauseConfiguration(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
