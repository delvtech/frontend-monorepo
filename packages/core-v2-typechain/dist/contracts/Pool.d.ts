import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface PoolInterface extends utils.Interface {
    functions: {
        "DOMAIN_SEPARATOR()": FunctionFragment;
        "PERMIT_TYPEHASH()": FunctionFragment;
        "authorize(address)": FunctionFragment;
        "authorized(address)": FunctionFragment;
        "balanceOf(uint256,address)": FunctionFragment;
        "batchTransferFrom(address,address,uint256[],uint256[])": FunctionFragment;
        "calculateAverageWeightedValue(uint256,uint32)": FunctionFragment;
        "collectFees(uint256,address)": FunctionFragment;
        "deauthorize(address)": FunctionFragment;
        "decimals()": FunctionFragment;
        "depositBonds(uint256,uint256,address,uint256)": FunctionFragment;
        "depositUnderlying(uint256,uint256,address,uint256)": FunctionFragment;
        "factory()": FunctionFragment;
        "governanceContract()": FunctionFragment;
        "governanceFeePercent()": FunctionFragment;
        "governanceFees(uint256)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "isAuthorized(address)": FunctionFragment;
        "linkerCodeHash()": FunctionFragment;
        "name(uint256)": FunctionFragment;
        "nonces(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "parameters(uint256)": FunctionFragment;
        "perTokenApprovals(uint256,address,address)": FunctionFragment;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)": FunctionFragment;
        "purchaseYt(uint256,uint256,address,uint256)": FunctionFragment;
        "readMetadataParsed(uint256)": FunctionFragment;
        "readSumAndTimeStampForPool(uint256,uint16)": FunctionFragment;
        "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)": FunctionFragment;
        "reserves(uint256)": FunctionFragment;
        "rollover(uint256,uint256,uint256,address,uint256)": FunctionFragment;
        "setApproval(uint256,address,uint256)": FunctionFragment;
        "setApprovalBridge(uint256,address,uint256,address)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setOwner(address)": FunctionFragment;
        "symbol(uint256)": FunctionFragment;
        "term()": FunctionFragment;
        "token()": FunctionFragment;
        "totalSupply(uint256)": FunctionFragment;
        "tradeBonds(uint256,uint256,uint256,address,bool)": FunctionFragment;
        "tradeFee()": FunctionFragment;
        "transferFrom(uint256,address,address,uint256)": FunctionFragment;
        "transferFromBridge(uint256,address,address,uint256,address)": FunctionFragment;
        "updateGovernanceFeePercent(uint128)": FunctionFragment;
        "updateTradeFee(uint128)": FunctionFragment;
        "withdraw(uint256,uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "DOMAIN_SEPARATOR" | "DOMAIN_SEPARATOR()" | "PERMIT_TYPEHASH" | "PERMIT_TYPEHASH()" | "authorize" | "authorize(address)" | "authorized" | "authorized(address)" | "balanceOf" | "balanceOf(uint256,address)" | "batchTransferFrom" | "batchTransferFrom(address,address,uint256[],uint256[])" | "calculateAverageWeightedValue" | "calculateAverageWeightedValue(uint256,uint32)" | "collectFees" | "collectFees(uint256,address)" | "deauthorize" | "deauthorize(address)" | "decimals" | "decimals()" | "depositBonds" | "depositBonds(uint256,uint256,address,uint256)" | "depositUnderlying" | "depositUnderlying(uint256,uint256,address,uint256)" | "factory" | "factory()" | "governanceContract" | "governanceContract()" | "governanceFeePercent" | "governanceFeePercent()" | "governanceFees" | "governanceFees(uint256)" | "isApprovedForAll" | "isApprovedForAll(address,address)" | "isAuthorized" | "isAuthorized(address)" | "linkerCodeHash" | "linkerCodeHash()" | "name" | "name(uint256)" | "nonces" | "nonces(address)" | "owner" | "owner()" | "parameters" | "parameters(uint256)" | "perTokenApprovals" | "perTokenApprovals(uint256,address,address)" | "permitForAll" | "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)" | "purchaseYt" | "purchaseYt(uint256,uint256,address,uint256)" | "readMetadataParsed" | "readMetadataParsed(uint256)" | "readSumAndTimeStampForPool" | "readSumAndTimeStampForPool(uint256,uint16)" | "registerPoolId" | "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)" | "reserves" | "reserves(uint256)" | "rollover" | "rollover(uint256,uint256,uint256,address,uint256)" | "setApproval" | "setApproval(uint256,address,uint256)" | "setApprovalBridge" | "setApprovalBridge(uint256,address,uint256,address)" | "setApprovalForAll" | "setApprovalForAll(address,bool)" | "setOwner" | "setOwner(address)" | "symbol" | "symbol(uint256)" | "term" | "term()" | "token" | "token()" | "totalSupply" | "totalSupply(uint256)" | "tradeBonds" | "tradeBonds(uint256,uint256,uint256,address,bool)" | "tradeFee" | "tradeFee()" | "transferFrom" | "transferFrom(uint256,address,address,uint256)" | "transferFromBridge" | "transferFromBridge(uint256,address,address,uint256,address)" | "updateGovernanceFeePercent" | "updateGovernanceFeePercent(uint128)" | "updateTradeFee" | "updateTradeFee(uint128)" | "withdraw" | "withdraw(uint256,uint256,address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR()", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "PERMIT_TYPEHASH()", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "collectFees", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "collectFees(uint256,address)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "deauthorize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "deauthorize(address)", values: [PromiseOrValue<string>]): string;
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
    encodeFunctionData(functionFragment: "governanceContract", values?: undefined): string;
    encodeFunctionData(functionFragment: "governanceContract()", values?: undefined): string;
    encodeFunctionData(functionFragment: "governanceFeePercent", values?: undefined): string;
    encodeFunctionData(functionFragment: "governanceFeePercent()", values?: undefined): string;
    encodeFunctionData(functionFragment: "governanceFees", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "governanceFees(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll(address,address)", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "linkerCodeHash", values?: undefined): string;
    encodeFunctionData(functionFragment: "linkerCodeHash()", values?: undefined): string;
    encodeFunctionData(functionFragment: "name", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "name(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "nonces", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "nonces(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
    encodeFunctionData(functionFragment: "parameters", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "parameters(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
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
    encodeFunctionData(functionFragment: "purchaseYt", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "purchaseYt(uint256,uint256,address,uint256)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readMetadataParsed(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "registerPoolId", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
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
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOwner(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "symbol", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "symbol(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "term", values?: undefined): string;
    encodeFunctionData(functionFragment: "term()", values?: undefined): string;
    encodeFunctionData(functionFragment: "token", values?: undefined): string;
    encodeFunctionData(functionFragment: "token()", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply(uint256)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "tradeBonds", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "tradeBonds(uint256,uint256,uint256,address,bool)", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "tradeFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "tradeFee()", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "updateGovernanceFeePercent", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateGovernanceFeePercent(uint128)", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTradeFee", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateTradeFee(uint128)", values: [PromiseOrValue<BigNumberish>]): string;
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
    decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchTransferFrom(address,address,uint256[],uint256[])", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateAverageWeightedValue(uint256,uint32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "collectFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "collectFees(uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositBonds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositBonds(uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnderlying", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositUnderlying(uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceContract()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceFeePercent()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "governanceFees(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll(address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "linkerCodeHash()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parameters", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "parameters(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "perTokenApprovals(uint256,address,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "purchaseYt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "purchaseYt(uint256,uint256,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readMetadataParsed(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "readSumAndTimeStampForPool(uint256,uint16)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPoolId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "term", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "term()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeBonds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeBonds(uint256,uint256,uint256,address,bool)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tradeFee()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom(uint256,address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFromBridge(uint256,address,address,uint256,address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateGovernanceFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateGovernanceFeePercent(uint128)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTradeFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateTradeFee(uint128)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw(uint256,uint256,address)", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "BondsTraded(uint256,address,bool,uint256,uint256)": EventFragment;
        "Sync(uint256,uint256,uint256)": EventFragment;
        "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
        "UpdateBuffer(uint256,uint256)": EventFragment;
        "YtPurchased(uint256,address,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Approval(address,address,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll(address,address,bool)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BondsTraded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BondsTraded(uint256,address,bool,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Sync"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Sync(uint256,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransferSingle(address,address,address,uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateBuffer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateBuffer(uint256,uint256)"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "YtPurchased"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "YtPurchased(uint256,address,uint256,uint256)"): EventFragment;
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
export interface BondsTradedEventObject {
    poolId: BigNumber;
    receiver: string;
    isBuy: boolean;
    amountIn: BigNumber;
    amountOut: BigNumber;
}
export declare type BondsTradedEvent = TypedEvent<[
    BigNumber,
    string,
    boolean,
    BigNumber,
    BigNumber
], BondsTradedEventObject>;
export declare type BondsTradedEventFilter = TypedEventFilter<BondsTradedEvent>;
export interface SyncEventObject {
    poolId: BigNumber;
    bondReserve: BigNumber;
    shareReserve: BigNumber;
}
export declare type SyncEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], SyncEventObject>;
export declare type SyncEventFilter = TypedEventFilter<SyncEvent>;
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
export interface UpdateBufferEventObject {
    value: BigNumber;
    metadata: BigNumber;
}
export declare type UpdateBufferEvent = TypedEvent<[
    BigNumber,
    BigNumber
], UpdateBufferEventObject>;
export declare type UpdateBufferEventFilter = TypedEventFilter<UpdateBufferEvent>;
export interface YtPurchasedEventObject {
    poolId: BigNumber;
    receiver: string;
    amountOfYtMinted: BigNumber;
    sharesIn: BigNumber;
}
export declare type YtPurchasedEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber,
    BigNumber
], YtPurchasedEventObject>;
export declare type YtPurchasedEventFilter = TypedEventFilter<YtPurchasedEvent>;
export interface Pool extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: PoolInterface;
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
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            averageWeightedValue: BigNumber;
        }>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            averageWeightedValue: BigNumber;
        }>;
        collectFees(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "collectFees(uint256,address)"(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
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
        governanceContract(overrides?: CallOverrides): Promise<[string]>;
        "governanceContract()"(overrides?: CallOverrides): Promise<[string]>;
        governanceFeePercent(overrides?: CallOverrides): Promise<[BigNumber]>;
        "governanceFeePercent()"(overrides?: CallOverrides): Promise<[BigNumber]>;
        governanceFees(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            feesInShares: BigNumber;
            feesInBonds: BigNumber;
        }>;
        "governanceFees(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            feesInShares: BigNumber;
            feesInBonds: BigNumber;
        }>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        linkerCodeHash(overrides?: CallOverrides): Promise<[string]>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<[string]>;
        name(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "name(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        "owner()"(overrides?: CallOverrides): Promise<[string]>;
        parameters(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
            timestretch: number;
            mu: BigNumber;
        }>;
        "parameters(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
            timestretch: number;
            mu: BigNumber;
        }>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        purchaseYt(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "purchaseYt(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        registerPoolId(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)"(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        symbol(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "symbol(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        term(overrides?: CallOverrides): Promise<[string]>;
        "term()"(overrides?: CallOverrides): Promise<[string]>;
        token(overrides?: CallOverrides): Promise<[string]>;
        "token()"(overrides?: CallOverrides): Promise<[string]>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        tradeBonds(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "tradeBonds(uint256,uint256,uint256,address,bool)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tradeFee(overrides?: CallOverrides): Promise<[BigNumber]>;
        "tradeFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;
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
        updateGovernanceFeePercent(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateGovernanceFeePercent(uint128)"(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateTradeFee(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "updateTradeFee(uint128)"(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
    calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    collectFees(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "collectFees(uint256,address)"(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
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
    governanceContract(overrides?: CallOverrides): Promise<string>;
    "governanceContract()"(overrides?: CallOverrides): Promise<string>;
    governanceFeePercent(overrides?: CallOverrides): Promise<BigNumber>;
    "governanceFeePercent()"(overrides?: CallOverrides): Promise<BigNumber>;
    governanceFees(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        feesInShares: BigNumber;
        feesInBonds: BigNumber;
    }>;
    "governanceFees(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        feesInShares: BigNumber;
        feesInBonds: BigNumber;
    }>;
    isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    linkerCodeHash(overrides?: CallOverrides): Promise<string>;
    "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
    name(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "name(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    "owner()"(overrides?: CallOverrides): Promise<string>;
    parameters(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
        timestretch: number;
        mu: BigNumber;
    }>;
    "parameters(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
        timestretch: number;
        mu: BigNumber;
    }>;
    perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    purchaseYt(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "purchaseYt(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
    registerPoolId(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)"(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
    setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    symbol(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "symbol(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    term(overrides?: CallOverrides): Promise<string>;
    "term()"(overrides?: CallOverrides): Promise<string>;
    token(overrides?: CallOverrides): Promise<string>;
    "token()"(overrides?: CallOverrides): Promise<string>;
    totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    tradeBonds(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "tradeBonds(uint256,uint256,uint256,address,bool)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tradeFee(overrides?: CallOverrides): Promise<BigNumber>;
    "tradeFee()"(overrides?: CallOverrides): Promise<BigNumber>;
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
    updateGovernanceFeePercent(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateGovernanceFeePercent(uint128)"(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateTradeFee(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "updateTradeFee(uint128)"(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        authorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        balanceOf(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "balanceOf(uint256,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        batchTransferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        "batchTransferFrom(address,address,uint256[],uint256[])"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], values: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        collectFees(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "collectFees(uint256,address)"(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        deauthorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        decimals(overrides?: CallOverrides): Promise<number>;
        "decimals()"(overrides?: CallOverrides): Promise<number>;
        depositBonds(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "depositBonds(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, bondsDeposited: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minLpOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        depositUnderlying(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "depositUnderlying(uint256,uint256,address,uint256)"(amount: PromiseOrValue<BigNumberish>, poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, minOutput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<string>;
        "factory()"(overrides?: CallOverrides): Promise<string>;
        governanceContract(overrides?: CallOverrides): Promise<string>;
        "governanceContract()"(overrides?: CallOverrides): Promise<string>;
        governanceFeePercent(overrides?: CallOverrides): Promise<BigNumber>;
        "governanceFeePercent()"(overrides?: CallOverrides): Promise<BigNumber>;
        governanceFees(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            feesInShares: BigNumber;
            feesInBonds: BigNumber;
        }>;
        "governanceFees(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            feesInShares: BigNumber;
            feesInBonds: BigNumber;
        }>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        linkerCodeHash(overrides?: CallOverrides): Promise<string>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<string>;
        name(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "name(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        "owner()"(overrides?: CallOverrides): Promise<string>;
        parameters(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
            timestretch: number;
            mu: BigNumber;
        }>;
        "parameters(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number, BigNumber] & {
            timestretch: number;
            mu: BigNumber;
        }>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        purchaseYt(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "purchaseYt(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
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
        registerPoolId(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)"(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
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
        setOwner(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        symbol(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "symbol(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        term(overrides?: CallOverrides): Promise<string>;
        "term()"(overrides?: CallOverrides): Promise<string>;
        token(overrides?: CallOverrides): Promise<string>;
        "token()"(overrides?: CallOverrides): Promise<string>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tradeBonds(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        "tradeBonds(uint256,uint256,uint256,address,bool)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        tradeFee(overrides?: CallOverrides): Promise<BigNumber>;
        "tradeFee()"(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "transferFrom(uint256,address,address,uint256)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferFromBridge(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "transferFromBridge(uint256,address,address,uint256,address)"(tokenID: PromiseOrValue<BigNumberish>, from: PromiseOrValue<string>, to: PromiseOrValue<string>, amount: PromiseOrValue<BigNumberish>, caller: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        updateGovernanceFeePercent(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "updateGovernanceFeePercent(uint128)"(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateTradeFee(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "updateTradeFee(uint128)"(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        withdraw(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "withdraw(uint256,uint256,address)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(account?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(account?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "BondsTraded(uint256,address,bool,uint256,uint256)"(poolId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, isBuy?: PromiseOrValue<boolean> | null, amountIn?: null, amountOut?: null): BondsTradedEventFilter;
        BondsTraded(poolId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, isBuy?: PromiseOrValue<boolean> | null, amountIn?: null, amountOut?: null): BondsTradedEventFilter;
        "Sync(uint256,uint256,uint256)"(poolId?: PromiseOrValue<BigNumberish> | null, bondReserve?: null, shareReserve?: null): SyncEventFilter;
        Sync(poolId?: PromiseOrValue<BigNumberish> | null, bondReserve?: null, shareReserve?: null): SyncEventFilter;
        "TransferSingle(address,address,address,uint256,uint256)"(operator?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, id?: null, value?: null): TransferSingleEventFilter;
        TransferSingle(operator?: PromiseOrValue<string> | null, from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, id?: null, value?: null): TransferSingleEventFilter;
        "UpdateBuffer(uint256,uint256)"(value?: null, metadata?: null): UpdateBufferEventFilter;
        UpdateBuffer(value?: null, metadata?: null): UpdateBufferEventFilter;
        "YtPurchased(uint256,address,uint256,uint256)"(poolId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, amountOfYtMinted?: null, sharesIn?: null): YtPurchasedEventFilter;
        YtPurchased(poolId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, amountOfYtMinted?: null, sharesIn?: null): YtPurchasedEventFilter;
    };
    estimateGas: {
        DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
        "DOMAIN_SEPARATOR()"(overrides?: CallOverrides): Promise<BigNumber>;
        PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        "PERMIT_TYPEHASH()"(overrides?: CallOverrides): Promise<BigNumber>;
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
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        collectFees(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "collectFees(uint256,address)"(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
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
        governanceContract(overrides?: CallOverrides): Promise<BigNumber>;
        "governanceContract()"(overrides?: CallOverrides): Promise<BigNumber>;
        governanceFeePercent(overrides?: CallOverrides): Promise<BigNumber>;
        "governanceFeePercent()"(overrides?: CallOverrides): Promise<BigNumber>;
        governanceFees(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "governanceFees(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        linkerCodeHash(overrides?: CallOverrides): Promise<BigNumber>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<BigNumber>;
        name(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "name(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        "owner()"(overrides?: CallOverrides): Promise<BigNumber>;
        parameters(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "parameters(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        purchaseYt(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "purchaseYt(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        registerPoolId(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)"(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        symbol(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "symbol(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        term(overrides?: CallOverrides): Promise<BigNumber>;
        "term()"(overrides?: CallOverrides): Promise<BigNumber>;
        token(overrides?: CallOverrides): Promise<BigNumber>;
        "token()"(overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        tradeBonds(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "tradeBonds(uint256,uint256,uint256,address,bool)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tradeFee(overrides?: CallOverrides): Promise<BigNumber>;
        "tradeFee()"(overrides?: CallOverrides): Promise<BigNumber>;
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
        updateGovernanceFeePercent(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateGovernanceFeePercent(uint128)"(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateTradeFee(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "updateTradeFee(uint128)"(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        calculateAverageWeightedValue(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "calculateAverageWeightedValue(uint256,uint32)"(bufferId: PromiseOrValue<BigNumberish>, timeInSeconds: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        collectFees(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "collectFees(uint256,address)"(poolId: PromiseOrValue<BigNumberish>, destination: PromiseOrValue<string>, overrides?: Overrides & {
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
        governanceContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "governanceContract()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        governanceFeePercent(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "governanceFeePercent()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        governanceFees(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "governanceFees(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isApprovedForAll(address,address)"(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        linkerCodeHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "linkerCodeHash()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "name(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonces(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "nonces(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        parameters(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "parameters(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        perTokenApprovals(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "perTokenApprovals(uint256,address,address)"(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        permitForAll(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "permitForAll(address,address,bool,uint256,uint8,bytes32,bytes32)"(owner: PromiseOrValue<string>, spender: PromiseOrValue<string>, _approved: PromiseOrValue<boolean>, deadline: PromiseOrValue<BigNumberish>, v: PromiseOrValue<BigNumberish>, r: PromiseOrValue<BytesLike>, s: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        purchaseYt(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "purchaseYt(uint256,uint256,address,uint256)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxInput: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        readMetadataParsed(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readMetadataParsed(uint256)"(bufferId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        readSumAndTimeStampForPool(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "readSumAndTimeStampForPool(uint256,uint16)"(bufferId: PromiseOrValue<BigNumberish>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerPoolId(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "registerPoolId(uint256,uint256,uint32,address,uint16,uint16)"(poolId: PromiseOrValue<BigNumberish>, underlyingIn: PromiseOrValue<BigNumberish>, timeStretch: PromiseOrValue<BigNumberish>, recipient: PromiseOrValue<string>, maxTime: PromiseOrValue<BigNumberish>, maxLength: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        symbol(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "symbol(uint256)"(poolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        term(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "term()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "token()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "totalSupply(uint256)"(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tradeBonds(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "tradeBonds(uint256,uint256,uint256,address,bool)"(poolId: PromiseOrValue<BigNumberish>, amount: PromiseOrValue<BigNumberish>, amountOut: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, isBuy: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tradeFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "tradeFee()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        updateGovernanceFeePercent(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateGovernanceFeePercent(uint128)"(newFeePercent: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateTradeFee(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "updateTradeFee(uint128)"(newTradeFee: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
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
