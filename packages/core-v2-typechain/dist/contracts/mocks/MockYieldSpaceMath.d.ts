import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface MockYieldSpaceMathInterface extends utils.Interface {
    functions: {
        "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "calculateOutGivenIn" | "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"): FunctionFragment;
    encodeFunctionData(functionFragment: "calculateOutGivenIn", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    decodeFunctionResult(functionFragment: "calculateOutGivenIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)", data: BytesLike): Result;
    events: {};
}
export interface MockYieldSpaceMath extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockYieldSpaceMathInterface;
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
        calculateOutGivenIn(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
        "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber] & {
            result: BigNumber;
        }>;
    };
    calculateOutGivenIn(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        calculateOutGivenIn(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        calculateOutGivenIn(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        calculateOutGivenIn(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "calculateOutGivenIn(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)"(shareReserves: PromiseOrValue<BigNumberish>, bondReserves: PromiseOrValue<BigNumberish>, totalSupply: PromiseOrValue<BigNumberish>, bondIn: PromiseOrValue<BigNumberish>, t: PromiseOrValue<BigNumberish>, s: PromiseOrValue<BigNumberish>, c: PromiseOrValue<BigNumberish>, mu: PromiseOrValue<BigNumberish>, isBondOut: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
