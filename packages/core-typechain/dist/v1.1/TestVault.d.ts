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
export interface TestVaultInterface extends utils.Interface {
  functions: {
    "pool()": FunctionFragment;
    "registerPool(uint8)": FunctionFragment;
    "registerTokens(bytes32,address[],address[])": FunctionFragment;
    "setPool(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "pool", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerPool",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "registerTokens",
    values: [BytesLike, string[], string[]],
  ): string;
  encodeFunctionData(functionFragment: "setPool", values: [string]): string;
  decodeFunctionResult(functionFragment: "pool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerPool",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setPool", data: BytesLike): Result;
  events: {};
}
export interface TestVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestVaultInterface;
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
    pool(overrides?: CallOverrides): Promise<[string]>;
    registerPool(
      arg0: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    registerTokens(
      arg0: BytesLike,
      arg1: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setPool(
      _pool: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  pool(overrides?: CallOverrides): Promise<string>;
  registerPool(
    arg0: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  registerTokens(
    arg0: BytesLike,
    arg1: string[],
    arg2: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setPool(
    _pool: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    pool(overrides?: CallOverrides): Promise<string>;
    registerPool(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    registerTokens(
      arg0: BytesLike,
      arg1: string[],
      arg2: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
    setPool(_pool: string, overrides?: CallOverrides): Promise<void>;
  };
  filters: {};
  estimateGas: {
    pool(overrides?: CallOverrides): Promise<BigNumber>;
    registerPool(
      arg0: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    registerTokens(
      arg0: BytesLike,
      arg1: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setPool(
      _pool: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    pool(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    registerPool(
      arg0: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    registerTokens(
      arg0: BytesLike,
      arg1: string[],
      arg2: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setPool(
      _pool: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
