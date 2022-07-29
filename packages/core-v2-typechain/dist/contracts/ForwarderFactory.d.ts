import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface ForwarderFactoryInterface extends utils.Interface {
    functions: {
        "ERC20LINK_HASH()": FunctionFragment;
        "create(address,uint256)": FunctionFragment;
        "getDeployDetails()": FunctionFragment;
        "getForwarder(address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ERC20LINK_HASH" | "ERC20LINK_HASH()" | "create" | "create(address,uint256)" | "getDeployDetails" | "getDeployDetails()" | "getForwarder" | "getForwarder(address,uint256)"): FunctionFragment;
    encodeFunctionData(functionFragment: "ERC20LINK_HASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "ERC20LINK_HASH()", values?: undefined): string;
    encodeFunctionData(functionFragment: "create", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "create(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getDeployDetails", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDeployDetails()", values?: undefined): string;
    encodeFunctionData(functionFragment: "getForwarder", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getForwarder(address,uint256)", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "ERC20LINK_HASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ERC20LINK_HASH()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "create(address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeployDetails", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeployDetails()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getForwarder(address,uint256)", data: BytesLike): Result;
    events: {};
}
export interface ForwarderFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ForwarderFactoryInterface;
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
        ERC20LINK_HASH(overrides?: CallOverrides): Promise<[string]>;
        "ERC20LINK_HASH()"(overrides?: CallOverrides): Promise<[string]>;
        create(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "create(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getDeployDetails(overrides?: CallOverrides): Promise<[string, BigNumber]>;
        "getDeployDetails()"(overrides?: CallOverrides): Promise<[string, BigNumber]>;
        getForwarder(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        "getForwarder(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
    };
    ERC20LINK_HASH(overrides?: CallOverrides): Promise<string>;
    "ERC20LINK_HASH()"(overrides?: CallOverrides): Promise<string>;
    create(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "create(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getDeployDetails(overrides?: CallOverrides): Promise<[string, BigNumber]>;
    "getDeployDetails()"(overrides?: CallOverrides): Promise<[string, BigNumber]>;
    getForwarder(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    "getForwarder(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        ERC20LINK_HASH(overrides?: CallOverrides): Promise<string>;
        "ERC20LINK_HASH()"(overrides?: CallOverrides): Promise<string>;
        create(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "create(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getDeployDetails(overrides?: CallOverrides): Promise<[string, BigNumber]>;
        "getDeployDetails()"(overrides?: CallOverrides): Promise<[string, BigNumber]>;
        getForwarder(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        "getForwarder(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        ERC20LINK_HASH(overrides?: CallOverrides): Promise<BigNumber>;
        "ERC20LINK_HASH()"(overrides?: CallOverrides): Promise<BigNumber>;
        create(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "create(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getDeployDetails(overrides?: CallOverrides): Promise<BigNumber>;
        "getDeployDetails()"(overrides?: CallOverrides): Promise<BigNumber>;
        getForwarder(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        "getForwarder(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ERC20LINK_HASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "ERC20LINK_HASH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        create(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "create(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getDeployDetails(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getDeployDetails()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getForwarder(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getForwarder(address,uint256)"(token: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
