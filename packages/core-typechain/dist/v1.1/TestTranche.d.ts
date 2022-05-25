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
export interface TestTrancheInterface extends utils.Interface {
  functions: {
    "underlying()": FunctionFragment;
    "unlockTimestamp()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "underlying",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "unlockTimestamp",
    values?: undefined,
  ): string;
  decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlockTimestamp",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface TestTranche extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestTrancheInterface;
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
    underlying(overrides?: CallOverrides): Promise<[string]>;
    unlockTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  underlying(overrides?: CallOverrides): Promise<string>;
  unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    underlying(overrides?: CallOverrides): Promise<string>;
    unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    underlying(overrides?: CallOverrides): Promise<BigNumber>;
    unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    underlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    unlockTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
