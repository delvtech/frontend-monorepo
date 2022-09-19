import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface MockTermInterface extends utils.Interface {
    functions: {
        "DOMAIN_SEPARATOR()": FunctionFragment;
        "PERMIT_TYPEHASH()": FunctionFragment;
        "UNLOCKED_YT_ID()": FunctionFragment;
        "authorize(address)": FunctionFragment;
        "authorized(address)": FunctionFragment;
        "balanceOf(uint256,address)": FunctionFragment;
        "batchTransferFrom(address,address,uint256[],uint256[])": FunctionFragment;
        "convertYT(uint256,uint256,address,bool)": FunctionFragment;
        "deauthorize(address)": FunctionFragment;
        "decimals()": FunctionFragment;
        "depositUnlocked(uint256,uint256,uint256,address)": FunctionFragment;
        "factory()": FunctionFragment;
        "finalizedTerms(uint256)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "isAuthorized(address)": FunctionFragment;
        "linkerCodeHash()": FunctionFragment;
        "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)": FunctionFragment;
        "name(uint256)": FunctionFragment;
        "nonces(address)": FunctionFragment;
        "one()": FunctionFragment;
        "owner()": FunctionFragment;
        "parseAssetIdExternal(uint256)": FunctionFragment;
        "perTokenApprovals(uint256,address,address)": FunctionFragment;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "redeem(uint256,uint256,uint256)": FunctionFragment;
        "setApproval(uint256,address,uint256)": FunctionFragment;
        "setApprovalBridge(uint256,address,uint256,address)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setOwner(address)": FunctionFragment;
        "sharesPerExpiry(uint256)": FunctionFragment;
        "symbol(uint256)": FunctionFragment;
        "token()": FunctionFragment;
        "totalSupply(uint256)": FunctionFragment;
        "transferFrom(uint256,address,address,uint256)": FunctionFragment;
        "transferFromBridge(uint256,address,address,uint256,address)": FunctionFragment;
        "unlock(address,uint256[],uint256[])": FunctionFragment;
        "unlockedSharePrice()": FunctionFragment;
        "yieldTerms(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DOMAIN_SEPARATOR" | "DOMAIN_SEPARATOR()" | "PERMIT_TYPEHASH" | "PERMIT_TYPEHASH()" | "UNLOCKED_YT_ID" | "UNLOCKED_YT_ID()" | "authorize" | "authorize(address)" | "authorized" | "authorized(address)" | "balanceOf" | "balanceOf(uint256,address)" | "batchTransferFrom" | "batchTransferFrom(address,address,uint256[],uint256[])" | "convertYT" | "convertYT(uint256,uint256,address,bool)" | "deauthorize" | "deauthorize(address)" | "decimals" | "decimals()" | "depositUnlocked" | "depositUnlocked(uint256,uint256,uint256,address)" | "factory" | "factory()" | "finalizedTerms" | "finalizedTerms(uint256)" | "isApprovedForAll" | "isApprovedForAll(address,address)" | "isAuthorized" | "isAuthorized(address)" | "linkerCodeHash" | "linkerCodeHash()" | "lock" | "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)" | "name" | "name(uint256)" | "nonces" | "nonces(address)" | "one" | "one()" | "owner" | "owner()" | "parseAssetIdExternal" | "parseAssetIdExternal(uint256)" | "perTokenApprovals" | "perTokenApprovals(uint256,address,address)" | "permitForAll" | "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)" | "redeem" | "redeem(uint256,uint256,uint256)" | "setApproval" | "setApproval(uint256,address,uint256)" | "setApprovalBridge" | "setApprovalBridge(uint256,address,uint256,address)" | "setApprovalForAll" | "setApprovalForAll(address,bool)" | "setOwner" | "setOwner(address)" | "sharesPerExpiry" | "sharesPerExpiry(uint256)" | "symbol" | "symbol(uint256)" | "token" | "token()" | "totalSupply" | "totalSupply(uint256)" | "transferFrom" | "transferFrom(uint256,address,address,uint256)" | "transferFromBridge" | "transferFromBridge(uint256,address,address,uint256,address)" | "unlock" | "unlock(address,uint256[],uint256[])" | "unlockedSharePrice" | "unlockedSharePrice()" | "yieldTerms" | "yieldTerms(uint256)"): FunctionFragment;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR()", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "UNLOCKED_YT_ID", values?: undefined): string;
    encodeFunctionData(functionFragment: "UNLOCKED_YT_ID()", values?: undefined): string;
    encodeFunctionData(functionFragment: "authorize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorize(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorized", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorized(address)", values: [PromiseOrValue<string>]): string;
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
    encodeFunctionData(functionFragment: "convertYT", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "convertYT(uint256,uint256,address,bool)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "deauthorize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "deauthorize(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decimals()", values?: undefined): string;
    encodeFunctionData(functionFragment: "depositUnlocked", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "depositUnlocked(uint256,uint256,uint256,address)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "factory", values?: undefined): string;
    encodeFunctionData(functionFragment: "factory()", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalizedTerms", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "finalizedTerms(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "linkerCodeHash", values?: undefined): string;
    encodeFunctionData(functionFragment: "linkerCodeHash()", values?: undefined): string;
    encodeFunctionData(functionFragment: "lock", values: [
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)", values: [
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "name", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "name(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "nonces", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nonces(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "one", values?: undefined): string;
    encodeFunctionData(functionFragment: "one()", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
    encodeFunctionData(functionFragment: "parseAssetIdExternal", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "parseAssetIdExternal(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
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
    encodeFunctionData(functionFragment: "redeem", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "redeem(uint256,uint256,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
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
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOwner(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "sharesPerExpiry", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "sharesPerExpiry(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "symbol", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "symbol(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
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
    encodeFunctionData(functionFragment: "unlock", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[]
    ]): string;
    encodeFunctionData(functionFragment: "unlock(address,uint256[],uint256[])", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[]
    ]): string;
    encodeFunctionData(functionFragment: "unlockedSharePrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "unlockedSharePrice()", values?: undefined): string;
    encodeFunctionData(functionFragment: "yieldTerms", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "yieldTerms(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PERMIT_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PERMIT_TYPEHASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UNLOCKED_YT_ID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UNLOCKED_YT_ID()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom(address,address,uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convertYT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convertYT(uint256,uint256,address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnlocked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnlocked(uint256,uint256,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalizedTerms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalizedTerms(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "one", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "one()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseAssetIdExternal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parseAssetIdExternal(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals(uint256,address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem(uint256,uint256,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApproval", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApproval(uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalBridge(uint256,address,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll(address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sharesPerExpiry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sharesPerExpiry(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom(uint256,address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge(uint256,address,address,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlock(address,uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockedSharePrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unlockedSharePrice()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "yieldTerms", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "yieldTerms(uint256)", data: BytesLike): Result;
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
export interface MockTerm extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockTermInterface;
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
        UNLOCKED_YT_ID(overrides?: CallOverrides): Promise<[BigNumber]>;
        "UNLOCKED_YT_ID()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        convertYT(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "convertYT(uint256,uint256,address,bool)"(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        "decimals()"(overrides?: CallOverrides): Promise<[number]>;
        depositUnlocked(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "depositUnlocked(uint256,uint256,uint256,address)"(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        factory(overrides?: CallOverrides): Promise<[string]>;
        "factory()"(overrides?: CallOverrides): Promise<[string]>;
        finalizedTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pricePerShare: BigNumber;
            interest: BigNumber;
        }>;
        "finalizedTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pricePerShare: BigNumber;
            interest: BigNumber;
        }>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        linkerCodeHash(overrides?: CallOverrides): Promise<[string]>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<[string]>;
        lock(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)"(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        one(overrides?: CallOverrides): Promise<[BigNumber]>;
        "one()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        "owner()"(overrides?: CallOverrides): Promise<[string]>;
        parseAssetIdExternal(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
        "parseAssetIdExternal(uint256)"(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        redeem(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "redeem(uint256,uint256,uint256)"(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sharesPerExpiry(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "sharesPerExpiry(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
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
        unlock(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "unlock(address,uint256[],uint256[])"(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unlockedSharePrice(overrides?: CallOverrides): Promise<[BigNumber]>;
        "unlockedSharePrice()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        yieldTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            shares: BigNumber;
            pt: BigNumber;
        }>;
        "yieldTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            shares: BigNumber;
            pt: BigNumber;
        }>;
    };
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<string>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
    UNLOCKED_YT_ID(overrides?: CallOverrides): Promise<BigNumber>;
    "UNLOCKED_YT_ID()"(overrides?: CallOverrides): Promise<BigNumber>;
    authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    convertYT(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "convertYT(uint256,uint256,address,bool)"(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    "decimals()"(overrides?: CallOverrides): Promise<number>;
    depositUnlocked(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "depositUnlocked(uint256,uint256,uint256,address)"(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    factory(overrides?: CallOverrides): Promise<string>;
    "factory()"(overrides?: CallOverrides): Promise<string>;
    finalizedTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        pricePerShare: BigNumber;
        interest: BigNumber;
    }>;
    "finalizedTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        pricePerShare: BigNumber;
        interest: BigNumber;
    }>;
    isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    linkerCodeHash(overrides?: CallOverrides): Promise<string>;
    "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
    lock(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)"(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    one(overrides?: CallOverrides): Promise<BigNumber>;
    "one()"(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    "owner()"(overrides?: CallOverrides): Promise<string>;
    parseAssetIdExternal(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
    "parseAssetIdExternal(uint256)"(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
    perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    redeem(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "redeem(uint256,uint256,uint256)"(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
    setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sharesPerExpiry(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "sharesPerExpiry(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
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
    unlock(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "unlock(address,uint256[],uint256[])"(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unlockedSharePrice(overrides?: CallOverrides): Promise<BigNumber>;
    "unlockedSharePrice()"(overrides?: CallOverrides): Promise<BigNumber>;
    yieldTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        shares: BigNumber;
        pt: BigNumber;
    }>;
    "yieldTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
        shares: BigNumber;
        pt: BigNumber;
    }>;
    callStatic: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<string>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<string>;
        UNLOCKED_YT_ID(overrides?: CallOverrides): Promise<BigNumber>;
        "UNLOCKED_YT_ID()"(overrides?: CallOverrides): Promise<BigNumber>;
        authorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        convertYT(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        "convertYT(uint256,uint256,address,bool)"(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        deauthorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        decimals(overrides?: CallOverrides): Promise<number>;
        "decimals()"(overrides?: CallOverrides): Promise<number>;
        depositUnlocked(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        "depositUnlocked(uint256,uint256,uint256,address)"(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        factory(overrides?: CallOverrides): Promise<string>;
        "factory()"(overrides?: CallOverrides): Promise<string>;
        finalizedTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pricePerShare: BigNumber;
            interest: BigNumber;
        }>;
        "finalizedTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            pricePerShare: BigNumber;
            interest: BigNumber;
        }>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        linkerCodeHash(overrides?: CallOverrides): Promise<string>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
        lock(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)"(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        one(overrides?: CallOverrides): Promise<BigNumber>;
        "one()"(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        "owner()"(overrides?: CallOverrides): Promise<string>;
        parseAssetIdExternal(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
        "parseAssetIdExternal(uint256)"(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean, BigNumber, BigNumber]>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        redeem(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "redeem(uint256,uint256,uint256)"(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        setApproval(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "setApproval(uint256,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setApprovalBridge(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "setApprovalBridge(uint256,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, operator: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        "setApprovalForAll(address,bool)"(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setOwner(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        sharesPerExpiry(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "sharesPerExpiry(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        token(overrides?: CallOverrides): Promise<string>;
        "token()"(overrides?: CallOverrides): Promise<string>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        unlock(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        "unlock(address,uint256[],uint256[])"(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        unlockedSharePrice(overrides?: CallOverrides): Promise<BigNumber>;
        "unlockedSharePrice()"(overrides?: CallOverrides): Promise<BigNumber>;
        yieldTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            shares: BigNumber;
            pt: BigNumber;
        }>;
        "yieldTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber] & {
            shares: BigNumber;
            pt: BigNumber;
        }>;
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
        UNLOCKED_YT_ID(overrides?: CallOverrides): Promise<BigNumber>;
        "UNLOCKED_YT_ID()"(overrides?: CallOverrides): Promise<BigNumber>;
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        convertYT(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "convertYT(uint256,uint256,address,bool)"(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;
        depositUnlocked(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "depositUnlocked(uint256,uint256,uint256,address)"(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<BigNumber>;
        "factory()"(overrides?: CallOverrides): Promise<BigNumber>;
        finalizedTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "finalizedTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        linkerCodeHash(overrides?: CallOverrides): Promise<BigNumber>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<BigNumber>;
        lock(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)"(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        one(overrides?: CallOverrides): Promise<BigNumber>;
        "one()"(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        "owner()"(overrides?: CallOverrides): Promise<BigNumber>;
        parseAssetIdExternal(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "parseAssetIdExternal(uint256)"(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        redeem(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "redeem(uint256,uint256,uint256)"(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sharesPerExpiry(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "sharesPerExpiry(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
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
        unlock(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "unlock(address,uint256[],uint256[])"(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unlockedSharePrice(overrides?: CallOverrides): Promise<BigNumber>;
        "unlockedSharePrice()"(overrides?: CallOverrides): Promise<BigNumber>;
        yieldTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "yieldTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        UNLOCKED_YT_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "UNLOCKED_YT_ID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        convertYT(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "convertYT(uint256,uint256,address,bool)"(assetId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, isCompound: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        depositUnlocked(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "depositUnlocked(uint256,uint256,uint256,address)"(underlyingAmount: PromiseOrValue<BigNumberish>, ptAmount: PromiseOrValue<BigNumberish>, ptExpiry: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "factory()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        finalizedTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "finalizedTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        linkerCodeHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lock(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "lock(uint256[],uint256[],uint256,bool,address,address,uint256,uint256)"(assetIds: PromiseOrValue<BigNumberish>[], assetAmounts: PromiseOrValue<BigNumberish>[], underlyingAmount: PromiseOrValue<BigNumberish>, hasPreFunding: PromiseOrValue<boolean>, ytDestination: PromiseOrValue<string>, ptDestination: PromiseOrValue<string>, ytBeginDate: PromiseOrValue<BigNumberish>, expiration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "name(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        one(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "one()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        parseAssetIdExternal(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "parseAssetIdExternal(uint256)"(_assetId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        redeem(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "redeem(uint256,uint256,uint256)"(yieldTokenId: PromiseOrValue<BigNumberish>, principalTokenId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sharesPerExpiry(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "sharesPerExpiry(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "symbol(uint256)"(id: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        unlock(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "unlock(address,uint256[],uint256[])"(destination: PromiseOrValue<string>, tokenIds: PromiseOrValue<BigNumberish>[], amounts: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unlockedSharePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "unlockedSharePrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        yieldTerms(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "yieldTerms(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
