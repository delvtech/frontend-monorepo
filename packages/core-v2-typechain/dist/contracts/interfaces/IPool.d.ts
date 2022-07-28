import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IPoolInterface extends utils.Interface {
    functions: {
        "exitPool(uint256,uint256,address)": FunctionFragment;
        "joinPool(uint256,uint256,uint256,address)": FunctionFragment;
        "quote(uint256,bool,uint256)": FunctionFragment;
        "rollover(uint256,uint256,uint256)": FunctionFragment;
        "trade(uint256,bool,uint256,uint256,address)": FunctionFragment;
        "virtualPrincipalSale(uint256,uint256,uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "exitPool" | "exitPool(uint256,uint256,address)" | "joinPool" | "joinPool(uint256,uint256,uint256,address)" | "quote" | "quote(uint256,bool,uint256)" | "rollover" | "rollover(uint256,uint256,uint256)" | "trade" | "trade(uint256,bool,uint256,uint256,address)" | "virtualPrincipalSale" | "virtualPrincipalSale(uint256,uint256,uint256,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "exitPool", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "exitPool(uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "joinPool", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "joinPool(uint256,uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "quote", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "quote(uint256,bool,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "rollover", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "rollover(uint256,uint256,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "trade", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "trade(uint256,bool,uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "virtualPrincipalSale", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "virtualPrincipalSale(uint256,uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "exitPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exitPool(uint256,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "joinPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "joinPool(uint256,uint256,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "quote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "quote(uint256,bool,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollover", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollover(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trade", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trade(uint256,bool,uint256,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "virtualPrincipalSale", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "virtualPrincipalSale(uint256,uint256,uint256,address)", data: BytesLike): Result;
    events: {};
}
export interface IPool extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPoolInterface;
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
        exitPool(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "exitPool(uint256,uint256,address)"(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        joinPool(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "joinPool(uint256,uint256,uint256,address)"(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        quote(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountOut: BigNumber;
        }>;
        "quote(uint256,bool,uint256)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountOut: BigNumber;
        }>;
        rollover(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "rollover(uint256,uint256,uint256)"(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        trade(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "trade(uint256,bool,uint256,uint256,address)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        virtualPrincipalSale(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "virtualPrincipalSale(uint256,uint256,uint256,address)"(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    exitPool(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "exitPool(uint256,uint256,address)"(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    joinPool(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "joinPool(uint256,uint256,uint256,address)"(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    quote(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "quote(uint256,bool,uint256)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    rollover(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "rollover(uint256,uint256,uint256)"(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    trade(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "trade(uint256,bool,uint256,uint256,address)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    virtualPrincipalSale(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "virtualPrincipalSale(uint256,uint256,uint256,address)"(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        exitPool(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            baseOut: BigNumber;
            bondOut: BigNumber;
        }>;
        "exitPool(uint256,uint256,address)"(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            baseOut: BigNumber;
            bondOut: BigNumber;
        }>;
        joinPool(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "joinPool(uint256,uint256,uint256,address)"(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        quote(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "quote(uint256,bool,uint256)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        rollover(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            baseOut: BigNumber;
            bondOut: BigNumber;
        }>;
        "rollover(uint256,uint256,uint256)"(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            baseOut: BigNumber;
            bondOut: BigNumber;
        }>;
        trade(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "trade(uint256,bool,uint256,uint256,address)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        virtualPrincipalSale(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            basePaid: BigNumber;
            ytBought: BigNumber;
        }>;
        "virtualPrincipalSale(uint256,uint256,uint256,address)"(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            basePaid: BigNumber;
            ytBought: BigNumber;
        }>;
    };
    filters: {};
    estimateGas: {
        exitPool(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "exitPool(uint256,uint256,address)"(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        joinPool(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "joinPool(uint256,uint256,uint256,address)"(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        quote(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "quote(uint256,bool,uint256)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        rollover(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "rollover(uint256,uint256,uint256)"(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        trade(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "trade(uint256,bool,uint256,uint256,address)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        virtualPrincipalSale(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "virtualPrincipalSale(uint256,uint256,uint256,address)"(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        exitPool(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "exitPool(uint256,uint256,address)"(lpOut: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        joinPool(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "joinPool(uint256,uint256,uint256,address)"(amountBond: PromiseOrValue<BigNumberish>, amountBase: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        quote(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "quote(uint256,bool,uint256)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollover(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "rollover(uint256,uint256,uint256)"(lpAmount: PromiseOrValue<BigNumberish>, inputPoolId: PromiseOrValue<BigNumberish>, outputPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        trade(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "trade(uint256,bool,uint256,uint256,address)"(amountIn: PromiseOrValue<BigNumberish>, baseIn: PromiseOrValue<boolean>, poolId: PromiseOrValue<BigNumberish>, minAmountOut: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        virtualPrincipalSale(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "virtualPrincipalSale(uint256,uint256,uint256,address)"(soldAmount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, maxAmountIn: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
