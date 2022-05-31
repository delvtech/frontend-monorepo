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
export declare type ZapInInfoStruct = {
  balancerPoolId: BytesLike;
  recipient: string;
  principalToken: string;
  minPtAmount: BigNumberish;
  deadline: BigNumberish;
  needsChildZap: boolean;
};
export declare type ZapInInfoStructOutput = [
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  boolean,
] & {
  balancerPoolId: string;
  recipient: string;
  principalToken: string;
  minPtAmount: BigNumber;
  deadline: BigNumber;
  needsChildZap: boolean;
};
export declare type ZapCurveLpInStruct = {
  curvePool: string;
  lpToken: string;
  amounts: BigNumberish[];
  roots: string[];
  parentIdx: BigNumberish;
  minLpAmount: BigNumberish;
};
export declare type ZapCurveLpInStructOutput = [
  string,
  string,
  BigNumber[],
  string[],
  BigNumber,
  BigNumber,
] & {
  curvePool: string;
  lpToken: string;
  amounts: BigNumber[];
  roots: string[];
  parentIdx: BigNumber;
  minLpAmount: BigNumber;
};
export declare type PermitDataStruct = {
  tokenContract: string;
  spender: string;
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
  spender: string;
  amount: BigNumber;
  expiration: BigNumber;
  r: string;
  s: string;
  v: number;
};
export declare type ZapOutInfoStruct = {
  balancerPoolId: BytesLike;
  principalToken: string;
  principalTokenAmount: BigNumberish;
  recipient: string;
  minBaseTokenAmount: BigNumberish;
  minRootTokenAmount: BigNumberish;
  deadline: BigNumberish;
  targetNeedsChildZap: boolean;
};
export declare type ZapOutInfoStructOutput = [
  string,
  string,
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
] & {
  balancerPoolId: string;
  principalToken: string;
  principalTokenAmount: BigNumber;
  recipient: string;
  minBaseTokenAmount: BigNumber;
  minRootTokenAmount: BigNumber;
  deadline: BigNumber;
  targetNeedsChildZap: boolean;
};
export declare type ZapCurveLpOutStruct = {
  curvePool: string;
  lpToken: string;
  rootTokenIdx: BigNumberish;
  rootToken: string;
  curveRemoveLiqFnIsUint256: boolean;
};
export declare type ZapCurveLpOutStructOutput = [
  string,
  string,
  BigNumber,
  string,
  boolean,
] & {
  curvePool: string;
  lpToken: string;
  rootTokenIdx: BigNumber;
  rootToken: string;
  curveRemoveLiqFnIsUint256: boolean;
};
export interface ZapSwapCurveInterface extends utils.Interface {
  functions: {
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "isFrozen()": FunctionFragment;
    "owner()": FunctionFragment;
    "setApprovalsFor(address[],address[],uint256[])": FunctionFragment;
    "setIsFrozen(bool)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "zapIn((bytes32,address,address,uint256,uint256,bool),(address,address,uint256[],address[],uint256,uint256),(address,address,uint256[],address[],uint256,uint256),(address,address,uint256,uint256,bytes32,bytes32,uint8)[])": FunctionFragment;
    "zapOut((bytes32,address,uint256,address,uint256,uint256,uint256,bool),(address,address,int128,address,bool),(address,address,int128,address,bool),(address,address,uint256,uint256,bytes32,bytes32,uint8)[])": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "isFrozen", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setApprovalsFor",
    values: [string[], string[], BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: "setIsFrozen",
    values: [boolean],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "zapIn",
    values: [
      ZapInInfoStruct,
      ZapCurveLpInStruct,
      ZapCurveLpInStruct,
      PermitDataStruct[],
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "zapOut",
    values: [
      ZapOutInfoStruct,
      ZapCurveLpOutStruct,
      ZapCurveLpOutStruct,
      PermitDataStruct[],
    ],
  ): string;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "isFrozen", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalsFor",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setIsFrozen",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zapIn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zapOut", data: BytesLike): Result;
  events: {};
}
export interface ZapSwapCurve extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ZapSwapCurveInterface;
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
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    isFrozen(overrides?: CallOverrides): Promise<[boolean]>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    setApprovalsFor(
      tokens: string[],
      spenders: string[],
      amounts: BigNumberish[],
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
    zapIn(
      _info: ZapInInfoStruct,
      _zap: ZapCurveLpInStruct,
      _childZap: ZapCurveLpInStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    zapOut(
      _info: ZapOutInfoStruct,
      _zap: ZapCurveLpOutStruct,
      _childZap: ZapCurveLpOutStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
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
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  isFrozen(overrides?: CallOverrides): Promise<boolean>;
  owner(overrides?: CallOverrides): Promise<string>;
  setApprovalsFor(
    tokens: string[],
    spenders: string[],
    amounts: BigNumberish[],
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
  zapIn(
    _info: ZapInInfoStruct,
    _zap: ZapCurveLpInStruct,
    _childZap: ZapCurveLpInStruct,
    _permitData: PermitDataStruct[],
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  zapOut(
    _info: ZapOutInfoStruct,
    _zap: ZapCurveLpOutStruct,
    _childZap: ZapCurveLpOutStruct,
    _permitData: PermitDataStruct[],
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    isFrozen(overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    setApprovalsFor(
      tokens: string[],
      spenders: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<void>;
    setIsFrozen(_newState: boolean, overrides?: CallOverrides): Promise<void>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
    zapIn(
      _info: ZapInInfoStruct,
      _zap: ZapCurveLpInStruct,
      _childZap: ZapCurveLpInStruct,
      _permitData: PermitDataStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    zapOut(
      _info: ZapOutInfoStruct,
      _zap: ZapCurveLpOutStruct,
      _childZap: ZapCurveLpOutStruct,
      _permitData: PermitDataStruct[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
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
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    isFrozen(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    setApprovalsFor(
      tokens: string[],
      spenders: string[],
      amounts: BigNumberish[],
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
    zapIn(
      _info: ZapInInfoStruct,
      _zap: ZapCurveLpInStruct,
      _childZap: ZapCurveLpInStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    zapOut(
      _info: ZapOutInfoStruct,
      _zap: ZapCurveLpOutStruct,
      _childZap: ZapCurveLpOutStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
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
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isFrozen(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setApprovalsFor(
      tokens: string[],
      spenders: string[],
      amounts: BigNumberish[],
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
    zapIn(
      _info: ZapInInfoStruct,
      _zap: ZapCurveLpInStruct,
      _childZap: ZapCurveLpInStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    zapOut(
      _info: ZapOutInfoStruct,
      _zap: ZapCurveLpOutStruct,
      _childZap: ZapCurveLpOutStruct,
      _permitData: PermitDataStruct[],
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
