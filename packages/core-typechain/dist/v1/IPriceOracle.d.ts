import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type OracleAccumulatorQueryStruct = {
  variable: BigNumberish;
  ago: BigNumberish;
};
export declare type OracleAccumulatorQueryStructOutput = [number, BigNumber] & {
  variable: number;
  ago: BigNumber;
};
export declare type OracleAverageQueryStruct = {
  variable: BigNumberish;
  secs: BigNumberish;
  ago: BigNumberish;
};
export declare type OracleAverageQueryStructOutput = [
  number,
  BigNumber,
  BigNumber,
] & {
  variable: number;
  secs: BigNumber;
  ago: BigNumber;
};
export interface IPriceOracleInterface extends utils.Interface {
  functions: {
    "getLargestSafeQueryWindow()": FunctionFragment;
    "getLatest(uint8)": FunctionFragment;
    "getPastAccumulators((uint8,uint256)[])": FunctionFragment;
    "getTimeWeightedAverage((uint8,uint256,uint256)[])": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getLargestSafeQueryWindow",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getLatest",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getPastAccumulators",
    values: [OracleAccumulatorQueryStruct[]],
  ): string;
  encodeFunctionData(
    functionFragment: "getTimeWeightedAverage",
    values: [OracleAverageQueryStruct[]],
  ): string;
  decodeFunctionResult(
    functionFragment: "getLargestSafeQueryWindow",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getLatest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPastAccumulators",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimeWeightedAverage",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface IPriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IPriceOracleInterface;
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
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<[BigNumber]>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        results: BigNumber[];
      }
    >;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        results: BigNumber[];
      }
    >;
  };
  getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
  getLatest(
    variable: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  getPastAccumulators(
    queries: OracleAccumulatorQueryStruct[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  getTimeWeightedAverage(
    queries: OracleAverageQueryStruct[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  callStatic: {
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
  };
  filters: {};
  estimateGas: {
    getLargestSafeQueryWindow(overrides?: CallOverrides): Promise<BigNumber>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getLargestSafeQueryWindow(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getLatest(
      variable: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getPastAccumulators(
      queries: OracleAccumulatorQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getTimeWeightedAverage(
      queries: OracleAverageQueryStruct[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
