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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface CDelegateInterfaceInterface extends utils.Interface {
  functions: {
    "_becomeImplementation(bytes)": FunctionFragment;
    "_resignImplementation()": FunctionFragment;
    "implementation()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "_becomeImplementation",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "_resignImplementation",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "_becomeImplementation",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "_resignImplementation",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CDelegateInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CDelegateInterfaceInterface;
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
    _becomeImplementation(
      data: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    _resignImplementation(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    implementation(overrides?: CallOverrides): Promise<[string]>;
  };
  _becomeImplementation(
    data: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  _resignImplementation(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  implementation(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    _becomeImplementation(
      data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    _resignImplementation(overrides?: CallOverrides): Promise<void>;
    implementation(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    _becomeImplementation(
      data: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    _resignImplementation(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    implementation(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    _becomeImplementation(
      data: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    _resignImplementation(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
