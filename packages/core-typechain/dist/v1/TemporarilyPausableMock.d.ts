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
export interface TemporarilyPausableMockInterface extends utils.Interface {
  functions: {
    "getPausedState()": FunctionFragment;
    "setPaused(bool)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getPausedState",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "setPaused", values: [boolean]): string;
  decodeFunctionResult(
    functionFragment: "getPausedState",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setPaused", data: BytesLike): Result;
  events: {
    "PausedStateChanged(bool)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "PausedStateChanged"): EventFragment;
}
export declare type PausedStateChangedEvent = TypedEvent<
  [boolean],
  {
    paused: boolean;
  }
>;
export declare type PausedStateChangedEventFilter =
  TypedEventFilter<PausedStateChangedEvent>;
export interface TemporarilyPausableMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TemporarilyPausableMockInterface;
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
    getPausedState(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  getPausedState(overrides?: CallOverrides): Promise<
    [boolean, BigNumber, BigNumber] & {
      paused: boolean;
      pauseWindowEndTime: BigNumber;
      bufferPeriodEndTime: BigNumber;
    }
  >;
  setPaused(
    paused: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    getPausedState(overrides?: CallOverrides): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
    setPaused(paused: boolean, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "PausedStateChanged(bool)"(paused?: null): PausedStateChangedEventFilter;
    PausedStateChanged(paused?: null): PausedStateChangedEventFilter;
  };
  estimateGas: {
    getPausedState(overrides?: CallOverrides): Promise<BigNumber>;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getPausedState(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setPaused(
      paused: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
