import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface LPInterface extends utils.Interface {
    functions: {
        "DOMAIN_SEPARATOR()": FunctionFragment;
        "PERMIT_TYPEHASH()": FunctionFragment;
        "balanceOf(uint256,address)": FunctionFragment;
        "batchTransferFrom(address,address,uint256[],uint256[])": FunctionFragment;
        "decimals()": FunctionFragment;
        "depositBonds(uint256,uint256,address,uint256)": FunctionFragment;
        "depositUnderlying(uint256,uint256,address,uint256)": FunctionFragment;
        "factory()": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "linkerCodeHash()": FunctionFragment;
        "name(uint256)": FunctionFragment;
        "nonces(address)": FunctionFragment;
        "perTokenApprovals(uint256,address,address)": FunctionFragment;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "reserves(uint256)": FunctionFragment;
        "rollover(uint256,uint256,uint256,address,uint256)": FunctionFragment;
        "setApproval(uint256,address,uint256)": FunctionFragment;
        "setApprovalBridge(uint256,address,uint256,address)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "symbol(uint256)": FunctionFragment;
        "term()": FunctionFragment;
        "token()": FunctionFragment;
        "totalSupply(uint256)": FunctionFragment;
        "transferFrom(uint256,address,address,uint256)": FunctionFragment;
        "transferFromBridge(uint256,address,address,uint256,address)": FunctionFragment;
        "withdraw(uint256,uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DOMAIN_SEPARATOR" | "DOMAIN_SEPARATOR()" | "PERMIT_TYPEHASH" | "PERMIT_TYPEHASH()" | "balanceOf" | "balanceOf(uint256,address)" | "batchTransferFrom" | "batchTransferFrom(address,address,uint256[],uint256[])" | "decimals" | "decimals()" | "depositBonds" | "depositBonds(uint256,uint256,address,uint256)" | "depositUnderlying" | "depositUnderlying(uint256,uint256,address,uint256)" | "factory" | "factory()" | "isApprovedForAll" | "isApprovedForAll(address,address)" | "linkerCodeHash" | "linkerCodeHash()" | "name" | "name(uint256)" | "nonces" | "nonces(address)" | "perTokenApprovals" | "perTokenApprovals(uint256,address,address)" | "permitForAll" | "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)" | "reserves" | "reserves(uint256)" | "rollover" | "rollover(uint256,uint256,uint256,address,uint256)" | "setApproval" | "setApproval(uint256,address,uint256)" | "setApprovalBridge" | "setApprovalBridge(uint256,address,uint256,address)" | "setApprovalForAll" | "setApprovalForAll(address,bool)" | "symbol" | "symbol(uint256)" | "term" | "term()" | "token" | "token()" | "totalSupply" | "totalSupply(uint256)" | "transferFrom" | "transferFrom(uint256,address,address,uint256)" | "transferFromBridge" | "transferFromBridge(uint256,address,address,uint256,address)" | "withdraw" | "withdraw(uint256,uint256,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR()", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "balanceOf(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[]
    ]): string;
    encodeFunctionData(functionFragment: "batchTransferFrom(address,address,uint256[],uint256[])", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[]
    ]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals()", values?: undefined): string;
    encodeFunctionData(functionFragment: "depositBonds", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "depositBonds(uint256,uint256,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "depositUnderlying", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "depositUnderlying(uint256,uint256,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "factory", values?: undefined): string;
    encodeFunctionData(functionFragment: "factory()", values?: undefined): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "linkerCodeHash", values?: undefined): string;
    encodeFunctionData(functionFragment: "linkerCodeHash()", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "name(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "nonces", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nonces(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "perTokenApprovals", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "perTokenApprovals(uint256,address,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "permitForAll", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "reserves", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "reserves(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "rollover", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "rollover(uint256,uint256,uint256,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setApproval", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setApproval(uint256,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalBridge", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalBridge(uint256,address,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll(address,bool)", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "symbol", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "symbol(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "term", values?: undefined): string;
    encodeFunctionData(functionFragment: "term()", values?: undefined): string;
    encodeFunctionData(functionFragment: "token", values?: undefined): string;
    encodeFunctionData(functionFragment: "token()", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferFrom(uint256,address,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferFromBridge", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "transferFromBridge(uint256,address,address,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "withdraw(uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PERMIT_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PERMIT_TYPEHASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom(address,address,uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositBonds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositBonds(uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnderlying", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnderlying(uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals(uint256,address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reserves", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reserves(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollover", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollover(uint256,uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApproval", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApproval(uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalBridge(uint256,address,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll(address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "term", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "term()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom(uint256,address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge(uint256,address,address,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(uint256,uint256,address)", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Approval(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll(address,address,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferSingle(address,address,address,uint256,uint256)"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    spender: string;
    value: BigNumber;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalForAllEventObject {
    account: string;
    operator: string;
    approved: boolean;
}
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export interface TransferSingleEventObject {
    operator: string;
    from: string;
    to: string;
    id: BigNumber;
    value: BigNumber;
}
export declare type TransferSingleEvent = TypedEvent<[
    string,
    string,
    string,
    BigNumber,
    BigNumber
], TransferSingleEventObject>;
export declare type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>;
export interface LP extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LPInterface;
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
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<[string]>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<[string]>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        "decimals()"(overrides?: CallOverrides): Promise<[number]>;
        depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        factory(overrides?: CallOverrides): Promise<[string]>;
        "factory()"(overrides?: CallOverrides): Promise<[string]>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        linkerCodeHash(overrides?: CallOverrides): Promise<[string]>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<[string]>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        reserves(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            shares: BigNumber;
            bonds: BigNumber;
        }>;
        "reserves(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            shares: BigNumber;
            bonds: BigNumber;
        }>;
        rollover(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "rollover(uint256,uint256,uint256,address,uint256)"(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        term(overrides?: CallOverrides): Promise<[string]>;
        "term()"(overrides?: CallOverrides): Promise<[string]>;
        token(overrides?: CallOverrides): Promise<[string]>;
        "token()"(overrides?: CallOverrides): Promise<[string]>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<string>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
    balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    "decimals()"(overrides?: CallOverrides): Promise<number>;
    depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    factory(overrides?: CallOverrides): Promise<string>;
    "factory()"(overrides?: CallOverrides): Promise<string>;
    isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    linkerCodeHash(overrides?: CallOverrides): Promise<string>;
    "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
    name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    reserves(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        shares: BigNumber;
        bonds: BigNumber;
    }>;
    "reserves(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        shares: BigNumber;
        bonds: BigNumber;
    }>;
    rollover(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "rollover(uint256,uint256,uint256,address,uint256)"(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    term(overrides?: CallOverrides): Promise<string>;
    "term()"(overrides?: CallOverrides): Promise<string>;
    token(overrides?: CallOverrides): Promise<string>;
    "token()"(overrides?: CallOverrides): Promise<string>;
    totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<string>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        decimals(overrides?: CallOverrides): Promise<number>;
        "decimals()"(overrides?: CallOverrides): Promise<number>;
        depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<string>;
        "factory()"(overrides?: CallOverrides): Promise<string>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        linkerCodeHash(overrides?: CallOverrides): Promise<string>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        reserves(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            shares: BigNumber;
            bonds: BigNumber;
        }>;
        "reserves(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            shares: BigNumber;
            bonds: BigNumber;
        }>;
        rollover(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "rollover(uint256,uint256,uint256,address,uint256)"(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        term(overrides?: CallOverrides): Promise<string>;
        "term()"(overrides?: CallOverrides): Promise<string>;
        token(overrides?: CallOverrides): Promise<string>;
        "token()"(overrides?: CallOverrides): Promise<string>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(account?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(account?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "TransferSingle(address,address,address,uint256,uint256)"(operator?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, id?: null, value?: null): TransferSingleEventFilter;
        TransferSingle(operator?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, id?: null, value?: null): TransferSingleEventFilter;
    };
    estimateGas: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<BigNumber>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;
        depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<BigNumber>;
        "factory()"(overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        linkerCodeHash(overrides?: CallOverrides): Promise<BigNumber>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<BigNumber>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        reserves(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "reserves(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        rollover(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "rollover(uint256,uint256,uint256,address,uint256)"(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        term(overrides?: CallOverrides): Promise<BigNumber>;
        "term()"(overrides?: CallOverrides): Promise<BigNumber>;
        token(overrides?: CallOverrides): Promise<BigNumber>;
        "token()"(overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "factory()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        linkerCodeHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        reserves(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "reserves(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollover(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "rollover(uint256,uint256,uint256,address,uint256)"(fromPoolId: PromiseOrValue<BigNumberish>, toPoolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        term(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "term()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "token()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
