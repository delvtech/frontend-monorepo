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
export interface WrappedCoveredPrincipalTokenFactoryInterface
  extends utils.Interface {
  functions: {
    "allWrappedCoveredPrincipalTokens()": FunctionFragment;
    "create(address,address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "allWrappedCoveredPrincipalTokens",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [string, string],
  ): string;
  decodeFunctionResult(
    functionFragment: "allWrappedCoveredPrincipalTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  events: {
    "WrappedCoveredPrincipalTokenCreated(address,address,address)": EventFragment;
  };
  getEvent(
    nameOrSignatureOrTopic: "WrappedCoveredPrincipalTokenCreated",
  ): EventFragment;
}
export declare type WrappedCoveredPrincipalTokenCreatedEvent = TypedEvent<
  [string, string, string],
  {
    _baseToken: string;
    _owner: string;
    _wcPrincipalToken: string;
  }
>;
export declare type WrappedCoveredPrincipalTokenCreatedEventFilter =
  TypedEventFilter<WrappedCoveredPrincipalTokenCreatedEvent>;
export interface WrappedCoveredPrincipalTokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: WrappedCoveredPrincipalTokenFactoryInterface;
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
    allWrappedCoveredPrincipalTokens(
      overrides?: CallOverrides,
    ): Promise<[string[]]>;
    create(
      _baseToken: string,
      _owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allWrappedCoveredPrincipalTokens(
    overrides?: CallOverrides,
  ): Promise<string[]>;
  create(
    _baseToken: string,
    _owner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allWrappedCoveredPrincipalTokens(
      overrides?: CallOverrides,
    ): Promise<string[]>;
    create(
      _baseToken: string,
      _owner: string,
      overrides?: CallOverrides,
    ): Promise<string>;
  };
  filters: {
    "WrappedCoveredPrincipalTokenCreated(address,address,address)"(
      _baseToken?: string | null,
      _owner?: string | null,
      _wcPrincipalToken?: null,
    ): WrappedCoveredPrincipalTokenCreatedEventFilter;
    WrappedCoveredPrincipalTokenCreated(
      _baseToken?: string | null,
      _owner?: string | null,
      _wcPrincipalToken?: null,
    ): WrappedCoveredPrincipalTokenCreatedEventFilter;
  };
  estimateGas: {
    allWrappedCoveredPrincipalTokens(
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    create(
      _baseToken: string,
      _owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allWrappedCoveredPrincipalTokens(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    create(
      _baseToken: string,
      _owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
