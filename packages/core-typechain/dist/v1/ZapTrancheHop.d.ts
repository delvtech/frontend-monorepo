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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ZapTrancheHopInterface extends utils.Interface {
  functions: {
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "hopToTranche(address,address,uint256,address,uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "isFrozen()": FunctionFragment;
    "owner()": FunctionFragment;
    "rescueTokens(address,uint256)": FunctionFragment;
    "setIsFrozen(bool)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "hopToTranche",
    values: [
      string,
      string,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "isFrozen", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rescueTokens",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "setIsFrozen",
    values: [boolean],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "hopToTranche",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "isFrozen", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rescueTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setIsFrozen",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  events: {};
}
export interface ZapTrancheHop extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ZapTrancheHopInterface;
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
    hopToTranche(
      _underlying: string,
      _positionFrom: string,
      _expirationFrom: BigNumberish,
      _positionTo: string,
      _expirationTo: BigNumberish,
      _amountPt: BigNumberish,
      _amountYt: BigNumberish,
      _ptExpected: BigNumberish,
      _ytExpected: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    isFrozen(overrides?: CallOverrides): Promise<[boolean]>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    rescueTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
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
  hopToTranche(
    _underlying: string,
    _positionFrom: string,
    _expirationFrom: BigNumberish,
    _positionTo: string,
    _expirationTo: BigNumberish,
    _amountPt: BigNumberish,
    _amountYt: BigNumberish,
    _ptExpected: BigNumberish,
    _ytExpected: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  isFrozen(overrides?: CallOverrides): Promise<boolean>;
  owner(overrides?: CallOverrides): Promise<string>;
  rescueTokens(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
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
  callStatic: {
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    hopToTranche(
      _underlying: string,
      _positionFrom: string,
      _expirationFrom: BigNumberish,
      _positionTo: string,
      _expirationTo: BigNumberish,
      _amountPt: BigNumberish,
      _amountYt: BigNumberish,
      _ptExpected: BigNumberish,
      _ytExpected: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    isFrozen(overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    rescueTokens(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    setIsFrozen(_newState: boolean, overrides?: CallOverrides): Promise<void>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
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
    hopToTranche(
      _underlying: string,
      _positionFrom: string,
      _expirationFrom: BigNumberish,
      _positionTo: string,
      _expirationTo: BigNumberish,
      _amountPt: BigNumberish,
      _amountYt: BigNumberish,
      _ptExpected: BigNumberish,
      _ytExpected: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    isFrozen(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    rescueTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
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
    hopToTranche(
      _underlying: string,
      _positionFrom: string,
      _expirationFrom: BigNumberish,
      _positionTo: string,
      _expirationTo: BigNumberish,
      _amountPt: BigNumberish,
      _amountYt: BigNumberish,
      _ptExpected: BigNumberish,
      _ytExpected: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isFrozen(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    rescueTokens(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
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
  };
}
