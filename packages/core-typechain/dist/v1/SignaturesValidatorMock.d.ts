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
export interface SignaturesValidatorMockInterface extends utils.Interface {
  functions: {
    "anotherFunction(address)": FunctionFragment;
    "authenticateCall(address)": FunctionFragment;
    "decodeCalldata()": FunctionFragment;
    "getDomainSeparator()": FunctionFragment;
    "getNextNonce(address)": FunctionFragment;
    "increaseNonce(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "anotherFunction",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "authenticateCall",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "decodeCalldata",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getDomainSeparator",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getNextNonce",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseNonce",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "anotherFunction",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "authenticateCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeCalldata",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDomainSeparator",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextNonce",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseNonce",
    data: BytesLike,
  ): Result;
  events: {
    "Authenticated(address,address)": EventFragment;
    "CalldataDecoded(bytes,uint256,uint8,bytes32,bytes32)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Authenticated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CalldataDecoded"): EventFragment;
}
export declare type AuthenticatedEvent = TypedEvent<
  [string, string],
  {
    user: string;
    sender: string;
  }
>;
export declare type AuthenticatedEventFilter =
  TypedEventFilter<AuthenticatedEvent>;
export declare type CalldataDecodedEvent = TypedEvent<
  [string, BigNumber, number, string, string],
  {
    data: string;
    deadline: BigNumber;
    v: number;
    r: string;
    s: string;
  }
>;
export declare type CalldataDecodedEventFilter =
  TypedEventFilter<CalldataDecodedEvent>;
export interface SignaturesValidatorMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: SignaturesValidatorMockInterface;
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
    anotherFunction(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    authenticateCall(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    decodeCalldata(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getDomainSeparator(overrides?: CallOverrides): Promise<[string]>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    increaseNonce(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  anotherFunction(
    user: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  authenticateCall(
    user: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  decodeCalldata(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getDomainSeparator(overrides?: CallOverrides): Promise<string>;
  getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
  increaseNonce(
    user: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    anotherFunction(user: string, overrides?: CallOverrides): Promise<void>;
    authenticateCall(user: string, overrides?: CallOverrides): Promise<void>;
    decodeCalldata(overrides?: CallOverrides): Promise<void>;
    getDomainSeparator(overrides?: CallOverrides): Promise<string>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
    increaseNonce(user: string, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "Authenticated(address,address)"(
      user?: null,
      sender?: null,
    ): AuthenticatedEventFilter;
    Authenticated(user?: null, sender?: null): AuthenticatedEventFilter;
    "CalldataDecoded(bytes,uint256,uint8,bytes32,bytes32)"(
      data?: null,
      deadline?: null,
      v?: null,
      r?: null,
      s?: null,
    ): CalldataDecodedEventFilter;
    CalldataDecoded(
      data?: null,
      deadline?: null,
      v?: null,
      r?: null,
      s?: null,
    ): CalldataDecodedEventFilter;
  };
  estimateGas: {
    anotherFunction(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    authenticateCall(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    decodeCalldata(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getDomainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
    increaseNonce(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    anotherFunction(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    authenticateCall(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    decodeCalldata(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getDomainSeparator(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getNextNonce(
      user: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    increaseNonce(
      user: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
