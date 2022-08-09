import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface MockTWAROracleInterface extends utils.Interface {
    functions: {
        "calculateAverageWeightedValue(uint256,uint32)": FunctionFragment;
        "initializeBuffer(uint256,uint16,uint16)": FunctionFragment;
        "readMetadataParsed(uint256)": FunctionFragment;
        "readSumAndTimeStampForPool(uint256,uint16)": FunctionFragment;
        "updateBuffer(uint256,uint224)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "calculateAverageWeightedValue" | "calculateAverageWeightedValue(uint256,uint32)" | "initializeBuffer" | "initializeBuffer(uint256,uint16,uint16)" | "readMetadataParsed" | "readMetadataParsed(uint256)" | "readSumAndTimeStampForPool" | "readSumAndTimeStampForPool(uint256,uint16)" | "updateBuffer" | "updateBuffer(uint256,uint224)"): FunctionFragment;
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "initializeBuffer", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "initializeBuffer(uint256,uint16,uint16)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateBuffer", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateBuffer(uint256,uint224)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeBuffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeBuffer(uint256,uint16,uint16)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateBuffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateBuffer(uint256,uint224)", data: BytesLike): Result;
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
export interface MockTWAROracle extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockTWAROracleInterface;
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
        initializeBuffer(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "initializeBuffer(uint256,uint16,uint16)"(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
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
        updateBuffer(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateBuffer(uint256,uint224)"(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    initializeBuffer(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "initializeBuffer(uint256,uint16,uint16)"(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
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
    updateBuffer(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateBuffer(uint256,uint224)"(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initializeBuffer(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "initializeBuffer(uint256,uint16,uint16)"(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
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
        updateBuffer(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "updateBuffer(uint256,uint224)"(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "UpdateBuffer(uint256,uint256)"(value?: null, metadata?: null): UpdateBufferEventFilter;
        UpdateBuffer(value?: null, metadata?: null): UpdateBufferEventFilter;
    };
    estimateGas: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        initializeBuffer(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "initializeBuffer(uint256,uint16,uint16)"(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        updateBuffer(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateBuffer(uint256,uint224)"(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initializeBuffer(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "initializeBuffer(uint256,uint16,uint16)"(bufferId: PromiseOrValue<BigNumberish>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateBuffer(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateBuffer(uint256,uint224)"(bufferId: PromiseOrValue<BigNumberish>, price: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
