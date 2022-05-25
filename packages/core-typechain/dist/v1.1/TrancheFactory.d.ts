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
export interface TrancheFactoryInterface extends utils.Interface {
  functions: {
    "TRANCHE_CREATION_HASH()": FunctionFragment;
    "deployTranche(uint256,address)": FunctionFragment;
    "getData()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "TRANCHE_CREATION_HASH",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "deployTranche",
    values: [BigNumberish, string],
  ): string;
  encodeFunctionData(functionFragment: "getData", values?: undefined): string;
  decodeFunctionResult(
    functionFragment: "TRANCHE_CREATION_HASH",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployTranche",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
  events: {
    "TrancheCreated(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "TrancheCreated"): EventFragment;
}
export declare type TrancheCreatedEvent = TypedEvent<
  [string, string, BigNumber],
  {
    trancheAddress: string;
    wpAddress: string;
    expiration: BigNumber;
  }
>;
export declare type TrancheCreatedEventFilter =
  TypedEventFilter<TrancheCreatedEvent>;
export interface TrancheFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TrancheFactoryInterface;
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
    TRANCHE_CREATION_HASH(overrides?: CallOverrides): Promise<[string]>;
    deployTranche(
      _expiration: BigNumberish,
      _wpAddress: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getData(
      overrides?: CallOverrides,
    ): Promise<[string, BigNumber, string, string]>;
  };
  TRANCHE_CREATION_HASH(overrides?: CallOverrides): Promise<string>;
  deployTranche(
    _expiration: BigNumberish,
    _wpAddress: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getData(
    overrides?: CallOverrides,
  ): Promise<[string, BigNumber, string, string]>;
  callStatic: {
    TRANCHE_CREATION_HASH(overrides?: CallOverrides): Promise<string>;
    deployTranche(
      _expiration: BigNumberish,
      _wpAddress: string,
      overrides?: CallOverrides,
    ): Promise<string>;
    getData(
      overrides?: CallOverrides,
    ): Promise<[string, BigNumber, string, string]>;
  };
  filters: {
    "TrancheCreated(address,address,uint256)"(
      trancheAddress?: string | null,
      wpAddress?: string | null,
      expiration?: BigNumberish | null,
    ): TrancheCreatedEventFilter;
    TrancheCreated(
      trancheAddress?: string | null,
      wpAddress?: string | null,
      expiration?: BigNumberish | null,
    ): TrancheCreatedEventFilter;
  };
  estimateGas: {
    TRANCHE_CREATION_HASH(overrides?: CallOverrides): Promise<BigNumber>;
    deployTranche(
      _expiration: BigNumberish,
      _wpAddress: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getData(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    TRANCHE_CREATION_HASH(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    deployTranche(
      _expiration: BigNumberish,
      _wpAddress: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getData(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
