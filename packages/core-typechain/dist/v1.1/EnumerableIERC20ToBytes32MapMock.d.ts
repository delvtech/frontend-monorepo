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
export interface EnumerableIERC20ToBytes32MapMockInterface
  extends utils.Interface {
  functions: {
    "at(uint256)": FunctionFragment;
    "contains(address)": FunctionFragment;
    "get(address,uint256)": FunctionFragment;
    "length()": FunctionFragment;
    "remove(address)": FunctionFragment;
    "set(address,bytes32)": FunctionFragment;
    "unchecked_at(uint256)": FunctionFragment;
    "unchecked_indexOf(address)": FunctionFragment;
    "unchecked_setAt(uint256,bytes32)": FunctionFragment;
    "unchecked_valueAt(uint256)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "at", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "contains", values: [string]): string;
  encodeFunctionData(
    functionFragment: "get",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "length", values?: undefined): string;
  encodeFunctionData(functionFragment: "remove", values: [string]): string;
  encodeFunctionData(
    functionFragment: "set",
    values: [string, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "unchecked_at",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "unchecked_indexOf",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "unchecked_setAt",
    values: [BigNumberish, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "unchecked_valueAt",
    values: [BigNumberish],
  ): string;
  decodeFunctionResult(functionFragment: "at", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "contains", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "length", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remove", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unchecked_at",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "unchecked_indexOf",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "unchecked_setAt",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "unchecked_valueAt",
    data: BytesLike,
  ): Result;
  events: {
    "OperationResult(bool)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OperationResult"): EventFragment;
}
export declare type OperationResultEvent = TypedEvent<
  [boolean],
  {
    result: boolean;
  }
>;
export declare type OperationResultEventFilter =
  TypedEventFilter<OperationResultEvent>;
export interface EnumerableIERC20ToBytes32MapMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: EnumerableIERC20ToBytes32MapMockInterface;
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
    at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [string, string] & {
        key: string;
        value: string;
      }
    >;
    contains(key: string, overrides?: CallOverrides): Promise<[boolean]>;
    get(
      key: string,
      errorCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    length(overrides?: CallOverrides): Promise<[BigNumber]>;
    remove(
      key: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    set(
      key: string,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    unchecked_at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [string, string] & {
        key: string;
        value: string;
      }
    >;
    unchecked_indexOf(
      key: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    unchecked_setAt(
      index: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    unchecked_valueAt(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [string] & {
        value: string;
      }
    >;
  };
  at(
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [string, string] & {
      key: string;
      value: string;
    }
  >;
  contains(key: string, overrides?: CallOverrides): Promise<boolean>;
  get(
    key: string,
    errorCode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  length(overrides?: CallOverrides): Promise<BigNumber>;
  remove(
    key: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  set(
    key: string,
    value: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  unchecked_at(
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [string, string] & {
      key: string;
      value: string;
    }
  >;
  unchecked_indexOf(key: string, overrides?: CallOverrides): Promise<BigNumber>;
  unchecked_setAt(
    index: BigNumberish,
    value: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  unchecked_valueAt(
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  callStatic: {
    at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [string, string] & {
        key: string;
        value: string;
      }
    >;
    contains(key: string, overrides?: CallOverrides): Promise<boolean>;
    get(
      key: string,
      errorCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    length(overrides?: CallOverrides): Promise<BigNumber>;
    remove(key: string, overrides?: CallOverrides): Promise<void>;
    set(
      key: string,
      value: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    unchecked_at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [string, string] & {
        key: string;
        value: string;
      }
    >;
    unchecked_indexOf(
      key: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    unchecked_setAt(
      index: BigNumberish,
      value: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    unchecked_valueAt(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
  };
  filters: {
    "OperationResult(bool)"(result?: null): OperationResultEventFilter;
    OperationResult(result?: null): OperationResultEventFilter;
  };
  estimateGas: {
    at(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    contains(key: string, overrides?: CallOverrides): Promise<BigNumber>;
    get(
      key: string,
      errorCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    length(overrides?: CallOverrides): Promise<BigNumber>;
    remove(
      key: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    set(
      key: string,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    unchecked_at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    unchecked_indexOf(
      key: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    unchecked_setAt(
      index: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    unchecked_valueAt(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    contains(
      key: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    get(
      key: string,
      errorCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    length(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    remove(
      key: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    set(
      key: string,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    unchecked_at(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    unchecked_indexOf(
      key: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    unchecked_setAt(
      index: BigNumberish,
      value: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    unchecked_valueAt(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
