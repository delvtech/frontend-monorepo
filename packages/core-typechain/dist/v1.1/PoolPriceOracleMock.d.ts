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
export declare type SampleStruct = {
  logPairPrice: BigNumberish;
  accLogPairPrice: BigNumberish;
  logBptPrice: BigNumberish;
  accLogBptPrice: BigNumberish;
  logInvariant: BigNumberish;
  accLogInvariant: BigNumberish;
  timestamp: BigNumberish;
};
export declare type SampleStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
] & {
  logPairPrice: BigNumber;
  accLogPairPrice: BigNumber;
  logBptPrice: BigNumber;
  accLogBptPrice: BigNumber;
  logInvariant: BigNumber;
  accLogInvariant: BigNumber;
  timestamp: BigNumber;
};
export declare type BinarySearchResultStruct = {
  prev: BigNumberish;
  next: BigNumberish;
};
export declare type BinarySearchResultStructOutput = [BigNumber, BigNumber] & {
  prev: BigNumber;
  next: BigNumber;
};
export interface PoolPriceOracleMockInterface extends utils.Interface {
  functions: {
    "decode(bytes32)": FunctionFragment;
    "encode((int256,int256,int256,int256,int256,int256,uint256))": FunctionFragment;
    "findNearestSamplesTimestamp(uint256[],uint256)": FunctionFragment;
    "getPastAccumulator(uint8,uint256,uint256)": FunctionFragment;
    "getSample(uint256)": FunctionFragment;
    "getTotalSamples()": FunctionFragment;
    "mockSample(uint256,(int256,int256,int256,int256,int256,int256,uint256))": FunctionFragment;
    "mockSamples(uint256[],(int256,int256,int256,int256,int256,int256,uint256)[])": FunctionFragment;
    "processPriceData(uint256,uint256,int256,int256,int256)": FunctionFragment;
    "update(bytes32,int256,int256,int256,uint256)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "decode", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "encode",
    values: [SampleStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "findNearestSamplesTimestamp",
    values: [BigNumberish[], BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getPastAccumulator",
    values: [BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getSample",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSamples",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "mockSample",
    values: [BigNumberish, SampleStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "mockSamples",
    values: [BigNumberish[], SampleStruct[]],
  ): string;
  encodeFunctionData(
    functionFragment: "processPriceData",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "update",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(functionFragment: "decode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "encode", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "findNearestSamplesTimestamp",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPastAccumulator",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getSample", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSamples",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "mockSample", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mockSamples",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "processPriceData",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;
  events: {
    "PriceDataProcessed(bool,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "PriceDataProcessed"): EventFragment;
}
export declare type PriceDataProcessedEvent = TypedEvent<
  [boolean, BigNumber],
  {
    newSample: boolean;
    sampleIndex: BigNumber;
  }
>;
export declare type PriceDataProcessedEventFilter =
  TypedEventFilter<PriceDataProcessedEvent>;
export interface PoolPriceOracleMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: PoolPriceOracleMockInterface;
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
    decode(
      sample: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[SampleStructOutput]>;
    encode(sample: SampleStruct, overrides?: CallOverrides): Promise<[string]>;
    findNearestSamplesTimestamp(
      dates: BigNumberish[],
      offset: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [BinarySearchResultStructOutput[]] & {
        results: BinarySearchResultStructOutput[];
      }
    >;
    getPastAccumulator(
      variable: BigNumberish,
      currentIndex: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;
    getTotalSamples(overrides?: CallOverrides): Promise<[BigNumber]>;
    mockSample(
      index: BigNumberish,
      sample: SampleStruct,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mockSamples(
      indexes: BigNumberish[],
      samples: SampleStruct[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    processPriceData(
      elapsed: BigNumberish,
      currentIndex: BigNumberish,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    update(
      sample: BytesLike,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[SampleStructOutput]>;
  };
  decode(
    sample: BytesLike,
    overrides?: CallOverrides,
  ): Promise<SampleStructOutput>;
  encode(sample: SampleStruct, overrides?: CallOverrides): Promise<string>;
  findNearestSamplesTimestamp(
    dates: BigNumberish[],
    offset: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BinarySearchResultStructOutput[]>;
  getPastAccumulator(
    variable: BigNumberish,
    currentIndex: BigNumberish,
    timestamp: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  getSample(
    index: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
    ] & {
      logPairPrice: BigNumber;
      accLogPairPrice: BigNumber;
      logBptPrice: BigNumber;
      accLogBptPrice: BigNumber;
      logInvariant: BigNumber;
      accLogInvariant: BigNumber;
      timestamp: BigNumber;
    }
  >;
  getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
  mockSample(
    index: BigNumberish,
    sample: SampleStruct,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mockSamples(
    indexes: BigNumberish[],
    samples: SampleStruct[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  processPriceData(
    elapsed: BigNumberish,
    currentIndex: BigNumberish,
    logPairPrice: BigNumberish,
    logBptPrice: BigNumberish,
    logInvariant: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  update(
    sample: BytesLike,
    logPairPrice: BigNumberish,
    logBptPrice: BigNumberish,
    logInvariant: BigNumberish,
    timestamp: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<SampleStructOutput>;
  callStatic: {
    decode(
      sample: BytesLike,
      overrides?: CallOverrides,
    ): Promise<SampleStructOutput>;
    encode(sample: SampleStruct, overrides?: CallOverrides): Promise<string>;
    findNearestSamplesTimestamp(
      dates: BigNumberish[],
      offset: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BinarySearchResultStructOutput[]>;
    getPastAccumulator(
      variable: BigNumberish,
      currentIndex: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;
    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
    mockSample(
      index: BigNumberish,
      sample: SampleStruct,
      overrides?: CallOverrides,
    ): Promise<void>;
    mockSamples(
      indexes: BigNumberish[],
      samples: SampleStruct[],
      overrides?: CallOverrides,
    ): Promise<void>;
    processPriceData(
      elapsed: BigNumberish,
      currentIndex: BigNumberish,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    update(
      sample: BytesLike,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<SampleStructOutput>;
  };
  filters: {
    "PriceDataProcessed(bool,uint256)"(
      newSample?: null,
      sampleIndex?: null,
    ): PriceDataProcessedEventFilter;
    PriceDataProcessed(
      newSample?: null,
      sampleIndex?: null,
    ): PriceDataProcessedEventFilter;
  };
  estimateGas: {
    decode(sample: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    encode(sample: SampleStruct, overrides?: CallOverrides): Promise<BigNumber>;
    findNearestSamplesTimestamp(
      dates: BigNumberish[],
      offset: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getPastAccumulator(
      variable: BigNumberish,
      currentIndex: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;
    mockSample(
      index: BigNumberish,
      sample: SampleStruct,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mockSamples(
      indexes: BigNumberish[],
      samples: SampleStruct[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    processPriceData(
      elapsed: BigNumberish,
      currentIndex: BigNumberish,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    update(
      sample: BytesLike,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    decode(
      sample: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    encode(
      sample: SampleStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    findNearestSamplesTimestamp(
      dates: BigNumberish[],
      offset: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getPastAccumulator(
      variable: BigNumberish,
      currentIndex: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getTotalSamples(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    mockSample(
      index: BigNumberish,
      sample: SampleStruct,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mockSamples(
      indexes: BigNumberish[],
      samples: SampleStruct[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    processPriceData(
      elapsed: BigNumberish,
      currentIndex: BigNumberish,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    update(
      sample: BytesLike,
      logPairPrice: BigNumberish,
      logBptPrice: BigNumberish,
      logInvariant: BigNumberish,
      timestamp: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
