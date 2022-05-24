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
export interface PausableInterface extends utils.Interface {
  functions: {
    "unpause()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "pause()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "Pause()": EventFragment;
    "Unpause()": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Pause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type PauseEvent = TypedEvent<[], {}>;
export declare type PauseEventFilter = TypedEventFilter<PauseEvent>;
export declare type UnpauseEvent = TypedEvent<[], {}>;
export declare type UnpauseEventFilter = TypedEventFilter<UnpauseEvent>;
export declare type OwnershipRenouncedEvent = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
export declare type OwnershipRenouncedEventFilter =
  TypedEventFilter<OwnershipRenouncedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
export declare type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;
export interface Pausable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: PausableInterface;
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
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  unpause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  pause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    unpause(overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    pause(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "Pause()"(): PauseEventFilter;
    Pause(): PauseEventFilter;
    "Unpause()"(): UnpauseEventFilter;
    Unpause(): UnpauseEventFilter;
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): OwnershipRenouncedEventFilter;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): OwnershipRenouncedEventFilter;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
  };
  estimateGas: {
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
