import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface TWAROracleInterface extends utils.Interface {
    functions: {
        "calculateAverageWeightedValue(uint256,uint32)": FunctionFragment;
        "readMetadataParsed(uint256)": FunctionFragment;
        "readSumAndTimeStampForPool(uint256,uint16)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "calculateAverageWeightedValue" | "calculateAverageWeightedValue(uint256,uint32)" | "readMetadataParsed" | "readMetadataParsed(uint256)" | "readSumAndTimeStampForPool" | "readSumAndTimeStampForPool(uint256,uint16)"): FunctionFragment;
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", data: BytesLike): Result;
    events: {
        "UpdateBuffer(uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "UpdateBuffer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateBuffer(uint256,uint256)"): EventFragment;
}
export interface UpdateBufferEventObject {
    value: BigNumber;
    metadata: BigNumber;
}
export declare type UpdateBufferEvent = TypedEvent<[
    BigNumber,
    BigNumber
], UpdateBufferEventObject>;
export declare type UpdateBufferEventFilter = TypedEventFilter<UpdateBufferEvent>;
export interface TWAROracle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: TWAROracleInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            averageWeightedValue: BigNumber;
        }>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            averageWeightedValue: BigNumber;
        }>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number
        ] & {
            minTimeStep: number;
            timeStamp: number;
            headIndex: number;
            maxLength: number;
            bufferLength: number;
        }>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number
        ] & {
            minTimeStep: number;
            timeStamp: number;
            headIndex: number;
            maxLength: number;
            bufferLength: number;
        }>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            BigNumber
        ] & {
            timeStamp: number;
            cumulativeSum: BigNumber;
        }>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            BigNumber
        ] & {
            timeStamp: number;
            cumulativeSum: BigNumber;
        }>;
    };
    calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        number,
        number,
        number
    ] & {
        minTimeStep: number;
        timeStamp: number;
        headIndex: number;
        maxLength: number;
        bufferLength: number;
    }>;
    "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        number,
        number,
        number
    ] & {
        minTimeStep: number;
        timeStamp: number;
        headIndex: number;
        maxLength: number;
        bufferLength: number;
    }>;
    readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        BigNumber
    ] & {
        timeStamp: number;
        cumulativeSum: BigNumber;
    }>;
    "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        BigNumber
    ] & {
        timeStamp: number;
        cumulativeSum: BigNumber;
    }>;
    callStatic: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number
        ] & {
            minTimeStep: number;
            timeStamp: number;
            headIndex: number;
            maxLength: number;
            bufferLength: number;
        }>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number
        ] & {
            minTimeStep: number;
            timeStamp: number;
            headIndex: number;
            maxLength: number;
            bufferLength: number;
        }>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            BigNumber
        ] & {
            timeStamp: number;
            cumulativeSum: BigNumber;
        }>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            BigNumber
        ] & {
            timeStamp: number;
            cumulativeSum: BigNumber;
        }>;
    };
    filters: {
        "UpdateBuffer(uint256,uint256)"(value?: null, metadata?: null): UpdateBufferEventFilter;
        UpdateBuffer(value?: null, metadata?: null): UpdateBufferEventFilter;
    };
    estimateGas: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
