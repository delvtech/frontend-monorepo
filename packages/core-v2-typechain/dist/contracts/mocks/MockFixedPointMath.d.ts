import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface MockFixedPointMathInterface extends utils.Interface {
    functions: {
        "add(uint256,uint256)": FunctionFragment;
        "exp(int256)": FunctionFragment;
        "ln(int256)": FunctionFragment;
        "pow(uint256,uint256)": FunctionFragment;
        "sub(uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "add" | "add(uint256,uint256)" | "exp" | "exp(int256)" | "ln" | "ln(int256)" | "pow" | "pow(uint256,uint256)" | "sub" | "sub(uint256,uint256)"): FunctionFragment;
    encodeFunctionData(functionFragment: "add", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "add(uint256,uint256)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "exp", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "exp(int256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "ln", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "ln(int256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "pow", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "pow(uint256,uint256)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "sub", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "sub(uint256,uint256)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "add(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exp(int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ln", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ln(int256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pow", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pow(uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sub", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sub(uint256,uint256)", data: BytesLike): Result;
    events: {};
}
export interface MockFixedPointMath extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockFixedPointMathInterface;
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
        add(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "add(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        exp(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "exp(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        ln(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "ln(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        pow(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "pow(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        sub(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "sub(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
    };
    add(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "add(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    exp(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "exp(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    ln(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "ln(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    pow(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "pow(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    sub(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "sub(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        add(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "add(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        exp(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "exp(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        ln(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "ln(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        pow(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "pow(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sub(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "sub(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        add(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "add(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        exp(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "exp(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        ln(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "ln(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        pow(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "pow(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sub(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "sub(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        add(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "add(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exp(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "exp(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ln(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "ln(int256)"(x: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pow(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "pow(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sub(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "sub(uint256,uint256)"(x: PromiseOrValue<BigNumberish>, y: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
