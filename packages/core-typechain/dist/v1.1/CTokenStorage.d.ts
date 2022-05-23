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
export interface CTokenStorageInterface extends utils.Interface {
  functions: {
    "accrualBlockNumber()": FunctionFragment;
    "admin()": FunctionFragment;
    "borrowIndex()": FunctionFragment;
    "comptroller()": FunctionFragment;
    "decimals()": FunctionFragment;
    "name()": FunctionFragment;
    "pendingAdmin()": FunctionFragment;
    "protocolSeizeShareMantissa()": FunctionFragment;
    "reserveFactorMantissa()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalBorrows()": FunctionFragment;
    "totalReserves()": FunctionFragment;
    "totalSupply()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "accrualBlockNumber",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "borrowIndex",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "comptroller",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingAdmin",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "protocolSeizeShareMantissa",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "reserveFactorMantissa",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalBorrows",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "totalReserves",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "accrualBlockNumber",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "borrowIndex",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "comptroller",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingAdmin",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolSeizeShareMantissa",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveFactorMantissa",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalBorrows",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalReserves",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CTokenStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CTokenStorageInterface;
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
    accrualBlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;
    admin(overrides?: CallOverrides): Promise<[string]>;
    borrowIndex(overrides?: CallOverrides): Promise<[BigNumber]>;
    comptroller(overrides?: CallOverrides): Promise<[string]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    pendingAdmin(overrides?: CallOverrides): Promise<[string]>;
    protocolSeizeShareMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;
    reserveFactorMantissa(overrides?: CallOverrides): Promise<[BigNumber]>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
    totalBorrows(overrides?: CallOverrides): Promise<[BigNumber]>;
    totalReserves(overrides?: CallOverrides): Promise<[BigNumber]>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
  };
  accrualBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
  admin(overrides?: CallOverrides): Promise<string>;
  borrowIndex(overrides?: CallOverrides): Promise<BigNumber>;
  comptroller(overrides?: CallOverrides): Promise<string>;
  decimals(overrides?: CallOverrides): Promise<number>;
  name(overrides?: CallOverrides): Promise<string>;
  pendingAdmin(overrides?: CallOverrides): Promise<string>;
  protocolSeizeShareMantissa(overrides?: CallOverrides): Promise<BigNumber>;
  reserveFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;
  symbol(overrides?: CallOverrides): Promise<string>;
  totalBorrows(overrides?: CallOverrides): Promise<BigNumber>;
  totalReserves(overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    accrualBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    admin(overrides?: CallOverrides): Promise<string>;
    borrowIndex(overrides?: CallOverrides): Promise<BigNumber>;
    comptroller(overrides?: CallOverrides): Promise<string>;
    decimals(overrides?: CallOverrides): Promise<number>;
    name(overrides?: CallOverrides): Promise<string>;
    pendingAdmin(overrides?: CallOverrides): Promise<string>;
    protocolSeizeShareMantissa(overrides?: CallOverrides): Promise<BigNumber>;
    reserveFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalBorrows(overrides?: CallOverrides): Promise<BigNumber>;
    totalReserves(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    accrualBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    admin(overrides?: CallOverrides): Promise<BigNumber>;
    borrowIndex(overrides?: CallOverrides): Promise<BigNumber>;
    comptroller(overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    pendingAdmin(overrides?: CallOverrides): Promise<BigNumber>;
    protocolSeizeShareMantissa(overrides?: CallOverrides): Promise<BigNumber>;
    reserveFactorMantissa(overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
    totalBorrows(overrides?: CallOverrides): Promise<BigNumber>;
    totalReserves(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    accrualBlockNumber(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    borrowIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    comptroller(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pendingAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    protocolSeizeShareMantissa(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    reserveFactorMantissa(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalBorrows(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
