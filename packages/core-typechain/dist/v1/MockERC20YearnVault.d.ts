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
export interface MockERC20YearnVaultInterface extends utils.Interface {
  functions: {
    "DEGRADATION_COEFFICIENT()": FunctionFragment;
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "apiVersion()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit(uint256,address)": FunctionFragment;
    "governance()": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "lastReport()": FunctionFragment;
    "lockedProfit()": FunctionFragment;
    "lockedProfitDegradation()": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "precisionFactor()": FunctionFragment;
    "pricePerShare()": FunctionFragment;
    "report(uint256)": FunctionFragment;
    "setDepositLimit(uint256)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "token()": FunctionFragment;
    "totalAssets()": FunctionFragment;
    "totalShares()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DEGRADATION_COEFFICIENT",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "apiVersion",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, string],
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "lastReport",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "lockedProfit",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "lockedProfitDegradation",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "precisionFactor",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "pricePerShare",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "report",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "setDepositLimit",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalAssets",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "totalShares",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "DEGRADATION_COEFFICIENT",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "apiVersion", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "lastReport", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lockedProfit",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockedProfitDegradation",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "precisionFactor",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "pricePerShare",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "report", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDepositLimit",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAssets",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalShares",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface MockERC20YearnVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockERC20YearnVaultInterface;
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
    DEGRADATION_COEFFICIENT(overrides?: CallOverrides): Promise<[BigNumber]>;
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    apiVersion(overrides?: CallOverrides): Promise<[string]>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      _amount: BigNumberish,
      _recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    governance(overrides?: CallOverrides): Promise<[string]>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    lastReport(overrides?: CallOverrides): Promise<[BigNumber]>;
    lockedProfit(overrides?: CallOverrides): Promise<[BigNumber]>;
    lockedProfitDegradation(overrides?: CallOverrides): Promise<[BigNumber]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    precisionFactor(overrides?: CallOverrides): Promise<[BigNumber]>;
    pricePerShare(overrides?: CallOverrides): Promise<[BigNumber]>;
    report(
      _deposit: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setDepositLimit(
      _limit: BigNumberish,
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
    symbol(overrides?: CallOverrides): Promise<[string]>;
    token(overrides?: CallOverrides): Promise<[string]>;
    totalAssets(overrides?: CallOverrides): Promise<[BigNumber]>;
    totalShares(overrides?: CallOverrides): Promise<[BigNumber]>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    transferFrom(
      spender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    withdraw(
      _maxShares: BigNumberish,
      _recipient: string,
      _maxLoss: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  DEGRADATION_COEFFICIENT(overrides?: CallOverrides): Promise<BigNumber>;
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  apiVersion(overrides?: CallOverrides): Promise<string>;
  approve(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  authorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  deauthorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    _amount: BigNumberish,
    _recipient: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  governance(overrides?: CallOverrides): Promise<string>;
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  lastReport(overrides?: CallOverrides): Promise<BigNumber>;
  lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;
  lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  owner(overrides?: CallOverrides): Promise<string>;
  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  precisionFactor(overrides?: CallOverrides): Promise<BigNumber>;
  pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;
  report(
    _deposit: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setDepositLimit(
    _limit: BigNumberish,
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
  symbol(overrides?: CallOverrides): Promise<string>;
  token(overrides?: CallOverrides): Promise<string>;
  totalAssets(overrides?: CallOverrides): Promise<BigNumber>;
  totalShares(overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  transferFrom(
    spender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  withdraw(
    _maxShares: BigNumberish,
    _recipient: string,
    _maxLoss: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    DEGRADATION_COEFFICIENT(overrides?: CallOverrides): Promise<BigNumber>;
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    apiVersion(overrides?: CallOverrides): Promise<string>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(
      _amount: BigNumberish,
      _recipient: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    governance(overrides?: CallOverrides): Promise<string>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    lastReport(overrides?: CallOverrides): Promise<BigNumber>;
    lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;
    lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    precisionFactor(overrides?: CallOverrides): Promise<BigNumber>;
    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;
    report(_deposit: BigNumberish, overrides?: CallOverrides): Promise<void>;
    setDepositLimit(
      _limit: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
    symbol(overrides?: CallOverrides): Promise<string>;
    token(overrides?: CallOverrides): Promise<string>;
    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;
    totalShares(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      spender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    withdraw(
      _maxShares: BigNumberish,
      _recipient: string,
      _maxLoss: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): ApprovalEventFilter;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): TransferEventFilter;
  };
  estimateGas: {
    DEGRADATION_COEFFICIENT(overrides?: CallOverrides): Promise<BigNumber>;
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    apiVersion(overrides?: CallOverrides): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    authorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      _amount: BigNumberish,
      _recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    governance(overrides?: CallOverrides): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    lastReport(overrides?: CallOverrides): Promise<BigNumber>;
    lockedProfit(overrides?: CallOverrides): Promise<BigNumber>;
    lockedProfitDegradation(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    precisionFactor(overrides?: CallOverrides): Promise<BigNumber>;
    pricePerShare(overrides?: CallOverrides): Promise<BigNumber>;
    report(
      _deposit: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setDepositLimit(
      _limit: BigNumberish,
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
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
    token(overrides?: CallOverrides): Promise<BigNumber>;
    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;
    totalShares(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    transferFrom(
      spender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    withdraw(
      _maxShares: BigNumberish,
      _recipient: string,
      _maxLoss: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DEGRADATION_COEFFICIENT(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    apiVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
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
    balanceOf(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      _amount: BigNumberish,
      _recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    lastReport(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    lockedProfit(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    lockedProfitDegradation(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    precisionFactor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pricePerShare(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    report(
      _deposit: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setDepositLimit(
      _limit: BigNumberish,
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
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalShares(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    transferFrom(
      spender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    withdraw(
      _maxShares: BigNumberish,
      _recipient: string,
      _maxLoss: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
