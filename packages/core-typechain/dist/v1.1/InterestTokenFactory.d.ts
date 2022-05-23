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
export interface InterestTokenFactoryInterface extends utils.Interface {
  functions: {
    "deployInterestToken(address,string,uint256,uint8)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "deployInterestToken",
    values: [string, string, BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "deployInterestToken",
    data: BytesLike,
  ): Result;
  events: {
    "InterestTokenCreated(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "InterestTokenCreated"): EventFragment;
}
export declare type InterestTokenCreatedEvent = TypedEvent<
  [string, string],
  {
    token: string;
    tranche: string;
  }
>;
export declare type InterestTokenCreatedEventFilter =
  TypedEventFilter<InterestTokenCreatedEvent>;
export interface InterestTokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: InterestTokenFactoryInterface;
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
    deployInterestToken(
      _tranche: string,
      _strategySymbol: string,
      _expiration: BigNumberish,
      _underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  deployInterestToken(
    _tranche: string,
    _strategySymbol: string,
    _expiration: BigNumberish,
    _underlyingDecimals: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    deployInterestToken(
      _tranche: string,
      _strategySymbol: string,
      _expiration: BigNumberish,
      _underlyingDecimals: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
  };
  filters: {
    "InterestTokenCreated(address,address)"(
      token?: string | null,
      tranche?: string | null,
    ): InterestTokenCreatedEventFilter;
    InterestTokenCreated(
      token?: string | null,
      tranche?: string | null,
    ): InterestTokenCreatedEventFilter;
  };
  estimateGas: {
    deployInterestToken(
      _tranche: string,
      _strategySymbol: string,
      _expiration: BigNumberish,
      _underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    deployInterestToken(
      _tranche: string,
      _strategySymbol: string,
      _expiration: BigNumberish,
      _underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
