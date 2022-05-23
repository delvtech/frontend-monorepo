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
export interface TestDateInterface extends utils.Interface {
  functions: {
    "encodePrefixTimestamp(string,uint256)": FunctionFragment;
    "encodeTimestamp(uint256)": FunctionFragment;
    "testString()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "encodePrefixTimestamp",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "encodeTimestamp",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "testString",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "encodePrefixTimestamp",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeTimestamp",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "testString", data: BytesLike): Result;
  events: {};
}
export interface TestDate extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestDateInterface;
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
    encodePrefixTimestamp(
      prefix: string,
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    encodeTimestamp(
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    testString(overrides?: CallOverrides): Promise<[string]>;
  };
  encodePrefixTimestamp(
    prefix: string,
    timestamp: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  encodeTimestamp(
    timestamp: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  testString(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    encodePrefixTimestamp(
      prefix: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    encodeTimestamp(
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    testString(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    encodePrefixTimestamp(
      prefix: string,
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    encodeTimestamp(
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    testString(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    encodePrefixTimestamp(
      prefix: string,
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    encodeTimestamp(
      timestamp: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    testString(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
