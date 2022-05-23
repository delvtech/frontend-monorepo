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
export interface TokenFactoryInterface extends utils.Interface {
  functions: {
    "create(address,string,string,uint8)": FunctionFragment;
    "getTokens(uint256,uint256)": FunctionFragment;
    "getTotalTokens()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "create",
    values: [string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getTokens",
    values: [BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalTokens",
    values?: undefined,
  ): string;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalTokens",
    data: BytesLike,
  ): Result;
  events: {
    "TokenCreated(address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "TokenCreated"): EventFragment;
}
export declare type TokenCreatedEvent = TypedEvent<
  [string],
  {
    token: string;
  }
>;
export declare type TokenCreatedEventFilter =
  TypedEventFilter<TokenCreatedEvent>;
export interface TokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TokenFactoryInterface;
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
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string[]]>;
    getTotalTokens(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  create(
    admin: string,
    name: string,
    symbol: string,
    decimals: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getTokens(
    start: BigNumberish,
    end: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string[]>;
  getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string[]>;
    getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {
    "TokenCreated(address)"(token?: string | null): TokenCreatedEventFilter;
    TokenCreated(token?: string | null): TokenCreatedEventFilter;
  };
  estimateGas: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getTotalTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
