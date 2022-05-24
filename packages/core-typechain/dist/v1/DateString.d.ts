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
export interface DateStringInterface extends utils.Interface {
  functions: {
    "OFFSET19700101()": FunctionFragment;
    "SECONDS_PER_DAY()": FunctionFragment;
    "SECONDS_PER_HOUR()": FunctionFragment;
    "SECONDS_PER_MINUTE()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "OFFSET19700101",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_PER_DAY",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_PER_HOUR",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "SECONDS_PER_MINUTE",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "OFFSET19700101",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_PER_DAY",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_PER_HOUR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "SECONDS_PER_MINUTE",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface DateString extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: DateStringInterface;
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
    OFFSET19700101(overrides?: CallOverrides): Promise<[BigNumber]>;
    SECONDS_PER_DAY(overrides?: CallOverrides): Promise<[BigNumber]>;
    SECONDS_PER_HOUR(overrides?: CallOverrides): Promise<[BigNumber]>;
    SECONDS_PER_MINUTE(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  OFFSET19700101(overrides?: CallOverrides): Promise<BigNumber>;
  SECONDS_PER_DAY(overrides?: CallOverrides): Promise<BigNumber>;
  SECONDS_PER_HOUR(overrides?: CallOverrides): Promise<BigNumber>;
  SECONDS_PER_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    OFFSET19700101(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_DAY(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_HOUR(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    OFFSET19700101(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_DAY(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_HOUR(overrides?: CallOverrides): Promise<BigNumber>;
    SECONDS_PER_MINUTE(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    OFFSET19700101(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    SECONDS_PER_DAY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    SECONDS_PER_HOUR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    SECONDS_PER_MINUTE(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
