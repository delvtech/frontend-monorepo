import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type PermitDataStruct = {
  tokenContract: string;
  who: string;
  amount: BigNumberish;
  expiration: BigNumberish;
  r: BytesLike;
  s: BytesLike;
  v: BigNumberish;
};
export declare type PermitDataStructOutput = [
  string,
  string,
  BigNumber,
  BigNumber,
  string,
  string,
  number,
] & {
  tokenContract: string;
  who: string;
  amount: BigNumber;
  expiration: BigNumber;
  r: string;
  s: string;
  v: number;
};
export interface TestUserProxyInterface extends utils.Interface {
  functions: {
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "deprecate()": FunctionFragment;
    "deriveTranche(address,uint256)": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "isFrozen()": FunctionFragment;
    "mint(uint256,address,uint256,address,(address,address,uint256,uint256,bytes32,bytes32,uint8)[])": FunctionFragment;
    "owner()": FunctionFragment;
    "setIsFrozen(bool)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "weth()": FunctionFragment;
    "withdrawWeth(uint256,address,uint256,uint256,(address,address,uint256,uint256,bytes32,bytes32,uint8)[])": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(functionFragment: "deprecate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deriveTranche",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "isFrozen", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, string, BigNumberish, string, PermitDataStruct[]],
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setIsFrozen",
    values: [boolean],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawWeth",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      PermitDataStruct[],
    ],
  ): string;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "deprecate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deriveTranche",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "isFrozen", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setIsFrozen",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawWeth",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface TestUserProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TestUserProxyInterface;
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
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    deprecate(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    deriveTranche(
      position: string,
      expiration: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    isFrozen(overrides?: CallOverrides): Promise<[boolean]>;
    mint(
      _amount: BigNumberish,
      _underlying: string,
      _expiration: BigNumberish,
      _position: string,
      _permitCallData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    setIsFrozen(
      _newState: boolean,
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
    weth(overrides?: CallOverrides): Promise<[string]>;
    withdrawWeth(
      _expiration: BigNumberish,
      _position: string,
      _amountPT: BigNumberish,
      _amountYT: BigNumberish,
      _permitCallData: PermitDataStruct[],
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
  deauthorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  deprecate(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  deriveTranche(
    position: string,
    expiration: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  isFrozen(overrides?: CallOverrides): Promise<boolean>;
  mint(
    _amount: BigNumberish,
    _underlying: string,
    _expiration: BigNumberish,
    _position: string,
    _permitCallData: PermitDataStruct[],
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  setIsFrozen(
    _newState: boolean,
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
  weth(overrides?: CallOverrides): Promise<string>;
  withdrawWeth(
    _expiration: BigNumberish,
    _position: string,
    _amountPT: BigNumberish,
    _amountYT: BigNumberish,
    _permitCallData: PermitDataStruct[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    deprecate(overrides?: CallOverrides): Promise<void>;
    deriveTranche(
      position: string,
      expiration: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    isFrozen(overrides?: CallOverrides): Promise<boolean>;
    mint(
      _amount: BigNumberish,
      _underlying: string,
      _expiration: BigNumberish,
      _position: string,
      _permitCallData: PermitDataStruct[],
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    owner(overrides?: CallOverrides): Promise<string>;
    setIsFrozen(_newState: boolean, overrides?: CallOverrides): Promise<void>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
    weth(overrides?: CallOverrides): Promise<string>;
    withdrawWeth(
      _expiration: BigNumberish,
      _position: string,
      _amountPT: BigNumberish,
      _amountYT: BigNumberish,
      _permitCallData: PermitDataStruct[],
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    deprecate(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    deriveTranche(
      position: string,
      expiration: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    isFrozen(overrides?: CallOverrides): Promise<BigNumber>;
    mint(
      _amount: BigNumberish,
      _underlying: string,
      _expiration: BigNumberish,
      _position: string,
      _permitCallData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    setIsFrozen(
      _newState: boolean,
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
    weth(overrides?: CallOverrides): Promise<BigNumber>;
    withdrawWeth(
      _expiration: BigNumberish,
      _position: string,
      _amountPT: BigNumberish,
      _amountYT: BigNumberish,
      _permitCallData: PermitDataStruct[],
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
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    deprecate(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    deriveTranche(
      position: string,
      expiration: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isFrozen(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    mint(
      _amount: BigNumberish,
      _underlying: string,
      _expiration: BigNumberish,
      _position: string,
      _permitCallData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setIsFrozen(
      _newState: boolean,
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
    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    withdrawWeth(
      _expiration: BigNumberish,
      _position: string,
      _amountPT: BigNumberish,
      _amountYT: BigNumberish,
      _permitCallData: PermitDataStruct[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
