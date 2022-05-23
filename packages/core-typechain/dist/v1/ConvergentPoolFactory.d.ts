import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ConvergentPoolFactoryInterface extends utils.Interface {
  functions: {
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "create(address,address,uint256,uint256,uint256,string,string)": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "getVault()": FunctionFragment;
    "governance()": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "isPoolFromFactory(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "percentFeeGov()": FunctionFragment;
    "setGov(address)": FunctionFragment;
    "setGovFee(uint256)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      string,
    ],
  ): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "isPoolFromFactory",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "percentFeeGov",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "setGov", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setGovFee",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isPoolFromFactory",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "percentFeeGov",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setGov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGovFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  events: {
    "CCPoolCreated(address,address)": EventFragment;
    "PoolCreated(address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "CCPoolCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
}
export declare type CCPoolCreatedEvent = TypedEvent<
  [string, string],
  {
    pool: string;
    bondToken: string;
  }
>;
export declare type CCPoolCreatedEventFilter =
  TypedEventFilter<CCPoolCreatedEvent>;
export declare type PoolCreatedEvent = TypedEvent<
  [string],
  {
    pool: string;
  }
>;
export declare type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;
export interface ConvergentPoolFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ConvergentPoolFactoryInterface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
    create(
      _underlying: string,
      _bond: string,
      _expiration: BigNumberish,
      _unitSeconds: BigNumberish,
      _percentFee: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getVault(overrides?: CallOverrides): Promise<[string]>;
    governance(overrides?: CallOverrides): Promise<[string]>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    percentFeeGov(overrides?: CallOverrides): Promise<[BigNumber]>;
    setGov(
      newGov: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setGovFee(
      newFee: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setOwner(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  authorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  create(
    _underlying: string,
    _bond: string,
    _expiration: BigNumberish,
    _unitSeconds: BigNumberish,
    _percentFee: BigNumberish,
    _name: string,
    _symbol: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  deauthorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getVault(overrides?: CallOverrides): Promise<string>;
  governance(overrides?: CallOverrides): Promise<string>;
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  isPoolFromFactory(pool: string, overrides?: CallOverrides): Promise<boolean>;
  owner(overrides?: CallOverrides): Promise<string>;
  percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
  setGov(
    newGov: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setGovFee(
    newFee: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setOwner(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    create(
      _underlying: string,
      _bond: string,
      _expiration: BigNumberish,
      _unitSeconds: BigNumberish,
      _percentFee: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: CallOverrides,
    ): Promise<string>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    getVault(overrides?: CallOverrides): Promise<string>;
    governance(overrides?: CallOverrides): Promise<string>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
    setGov(newGov: string, overrides?: CallOverrides): Promise<void>;
    setGovFee(newFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "CCPoolCreated(address,address)"(
      pool?: string | null,
      bondToken?: string | null,
    ): CCPoolCreatedEventFilter;
    CCPoolCreated(
      pool?: string | null,
      bondToken?: string | null,
    ): CCPoolCreatedEventFilter;
    "PoolCreated(address)"(pool?: string | null): PoolCreatedEventFilter;
    PoolCreated(pool?: string | null): PoolCreatedEventFilter;
  };
  estimateGas: {
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    create(
      _underlying: string,
      _bond: string,
      _expiration: BigNumberish,
      _unitSeconds: BigNumberish,
      _percentFee: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getVault(overrides?: CallOverrides): Promise<BigNumber>;
    governance(overrides?: CallOverrides): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    percentFeeGov(overrides?: CallOverrides): Promise<BigNumber>;
    setGov(
      newGov: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setGovFee(
      newFee: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setOwner(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    authorized(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    create(
      _underlying: string,
      _bond: string,
      _expiration: BigNumberish,
      _unitSeconds: BigNumberish,
      _percentFee: BigNumberish,
      _name: string,
      _symbol: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    percentFeeGov(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setGov(
      newGov: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setGovFee(
      newFee: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setOwner(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
