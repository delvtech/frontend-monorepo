import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface SignaturesValidatorInterface extends utils.Interface {
  functions: {
    "getDomainSeparator()": FunctionFragment;
    "getNextNonce(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getDomainSeparator",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getNextNonce",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "getDomainSeparator",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextNonce",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface SignaturesValidator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: SignaturesValidatorInterface;
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
    getDomainSeparator(overrides?: CallOverrides): Promise<[string]>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  getDomainSeparator(overrides?: CallOverrides): Promise<string>;
  getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    getDomainSeparator(overrides?: CallOverrides): Promise<string>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    getDomainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
    getNextNonce(user: string, overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    getDomainSeparator(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getNextNonce(
      user: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
