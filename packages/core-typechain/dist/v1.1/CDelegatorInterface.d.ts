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
export interface CDelegatorInterfaceInterface extends utils.Interface {
  functions: {
    "_setImplementation(address,bool,bytes)": FunctionFragment;
    "implementation()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "_setImplementation",
    values: [string, boolean, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "_setImplementation",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike,
  ): Result;
  events: {
    "NewImplementation(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "NewImplementation"): EventFragment;
}
export declare type NewImplementationEvent = TypedEvent<
  [string, string],
  {
    oldImplementation: string;
    newImplementation: string;
  }
>;
export declare type NewImplementationEventFilter =
  TypedEventFilter<NewImplementationEvent>;
export interface CDelegatorInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CDelegatorInterfaceInterface;
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
    _setImplementation(
      implementation_: string,
      allowResign: boolean,
      becomeImplementationData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    implementation(overrides?: CallOverrides): Promise<[string]>;
  };
  _setImplementation(
    implementation_: string,
    allowResign: boolean,
    becomeImplementationData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  implementation(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    _setImplementation(
      implementation_: string,
      allowResign: boolean,
      becomeImplementationData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    implementation(overrides?: CallOverrides): Promise<string>;
  };
  filters: {
    "NewImplementation(address,address)"(
      oldImplementation?: null,
      newImplementation?: null,
    ): NewImplementationEventFilter;
    NewImplementation(
      oldImplementation?: null,
      newImplementation?: null,
    ): NewImplementationEventFilter;
  };
  estimateGas: {
    _setImplementation(
      implementation_: string,
      allowResign: boolean,
      becomeImplementationData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    implementation(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    _setImplementation(
      implementation_: string,
      allowResign: boolean,
      becomeImplementationData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
