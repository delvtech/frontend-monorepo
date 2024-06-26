import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface AuthorizableInterface extends utils.Interface {
    functions: {
        "authorize(address)": FunctionFragment;
        "authorized(address)": FunctionFragment;
        "deauthorize(address)": FunctionFragment;
        "isAuthorized(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "setOwner(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "authorize" | "authorize(address)" | "authorized" | "authorized(address)" | "deauthorize" | "deauthorize(address)" | "isAuthorized" | "isAuthorized(address)" | "owner" | "owner()" | "setOwner" | "setOwner(address)"): FunctionFragment;
    encodeFunctionData(functionFragment: "authorize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorize(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorized", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "authorized(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "deauthorize", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "deauthorize(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized(address)", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
    encodeFunctionData(functionFragment: "setOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOwner(address)", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "authorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deauthorize(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized(address)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwner(address)", data: BytesLike): Result;
    events: {};
}
export interface Authorizable extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AuthorizableInterface;
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
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        "owner()"(overrides?: CallOverrides): Promise<[string]>;
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    "owner()"(overrides?: CallOverrides): Promise<string>;
    setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        authorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        deauthorize(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        owner(overrides?: CallOverrides): Promise<string>;
        "owner()"(overrides?: CallOverrides): Promise<string>;
        setOwner(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        "owner()"(overrides?: CallOverrides): Promise<BigNumber>;
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        authorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "authorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        authorized(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "authorized(address)"(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deauthorize(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "deauthorize(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isAuthorized(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "isAuthorized(address)"(who: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setOwner(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "setOwner(address)"(who: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
