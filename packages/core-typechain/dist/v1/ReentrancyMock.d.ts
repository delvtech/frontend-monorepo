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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ReentrancyMockInterface extends utils.Interface {
  functions: {
    "callback()": FunctionFragment;
    "countAndCall(address)": FunctionFragment;
    "countLocalRecursive(uint256)": FunctionFragment;
    "countThisRecursive(uint256)": FunctionFragment;
    "counter()": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "callback", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "countAndCall",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "countLocalRecursive",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "countThisRecursive",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "counter", values?: undefined): string;
  decodeFunctionResult(functionFragment: "callback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "countAndCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "countLocalRecursive",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "countThisRecursive",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "counter", data: BytesLike): Result;
  events: {};
}
export interface ReentrancyMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ReentrancyMockInterface;
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
    callback(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    countAndCall(
      attacker: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    counter(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  callback(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  countAndCall(
    attacker: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  countLocalRecursive(
    n: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  countThisRecursive(
    n: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  counter(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    callback(overrides?: CallOverrides): Promise<void>;
    countAndCall(attacker: string, overrides?: CallOverrides): Promise<void>;
    countLocalRecursive(
      n: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    countThisRecursive(
      n: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    counter(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    callback(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    countAndCall(
      attacker: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    counter(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    callback(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    countAndCall(
      attacker: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    counter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
