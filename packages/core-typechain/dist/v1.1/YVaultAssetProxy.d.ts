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
export interface YVaultAssetProxyInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "authorize(address)": FunctionFragment;
    "authorized(address)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "balanceOfUnderlying(address)": FunctionFragment;
    "conversionRate()": FunctionFragment;
    "deauthorize(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit(address,uint256)": FunctionFragment;
    "getSharesToUnderlying(uint256)": FunctionFragment;
    "isAuthorized(address)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause(bool)": FunctionFragment;
    "paused()": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "prefundedDeposit(address)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "token()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transition(address,uint256)": FunctionFragment;
    "vault()": FunctionFragment;
    "vaultDecimals()": FunctionFragment;
    "withdraw(address,uint256,uint256)": FunctionFragment;
    "withdrawUnderlying(address,uint256,uint256)": FunctionFragment;
  };
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
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "authorize", values: [string]): string;
  encodeFunctionData(functionFragment: "authorized", values: [string]): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "balanceOfUnderlying",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "conversionRate",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "deauthorize", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getSharesToUnderlying",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "isAuthorized",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values: [boolean]): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
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
    functionFragment: "prefundedDeposit",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transition",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "vaultDecimals",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawUnderlying",
    values: [string, BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "authorized", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "conversionRate",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "deauthorize",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSharesToUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "isAuthorized",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "prefundedDeposit",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "transition", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "vaultDecimals",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawUnderlying",
    data: BytesLike,
  ): Result;
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
export interface YVaultAssetProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: YVaultAssetProxyInterface;
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
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    "approve(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    "approve()"(
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
    balanceOfUnderlying(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    conversionRate(overrides?: CallOverrides): Promise<[BigNumber]>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      _destination: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getSharesToUnderlying(
      _shares: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<[boolean]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
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
    prefundedDeposit(
      _destination: string,
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
    transition(
      newVault: string,
      minOutputShares: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    vault(overrides?: CallOverrides): Promise<[string]>;
    vaultDecimals(overrides?: CallOverrides): Promise<[number]>;
    withdraw(
      _destination: string,
      _shares: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    withdrawUnderlying(
      _destination: string,
      _amount: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  "approve(address,uint256)"(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  "approve()"(
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
  balanceOfUnderlying(
    _who: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  conversionRate(overrides?: CallOverrides): Promise<BigNumber>;
  deauthorize(
    who: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    _destination: string,
    _amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getSharesToUnderlying(
    _shares: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  owner(overrides?: CallOverrides): Promise<string>;
  pause(
    pauseStatus: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
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
  prefundedDeposit(
    _destination: string,
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
  transition(
    newVault: string,
    minOutputShares: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  vault(overrides?: CallOverrides): Promise<string>;
  vaultDecimals(overrides?: CallOverrides): Promise<number>;
  withdraw(
    _destination: string,
    _shares: BigNumberish,
    _minUnderlying: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  withdrawUnderlying(
    _destination: string,
    _amount: BigNumberish,
    _minUnderlying: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    "approve(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    "approve()"(overrides?: CallOverrides): Promise<void>;
    authorize(who: string, overrides?: CallOverrides): Promise<void>;
    authorized(arg0: string, overrides?: CallOverrides): Promise<boolean>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    balanceOfUnderlying(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    conversionRate(overrides?: CallOverrides): Promise<BigNumber>;
    deauthorize(who: string, overrides?: CallOverrides): Promise<void>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(
      _destination: string,
      _amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getSharesToUnderlying(
      _shares: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    pause(pauseStatus: boolean, overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
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
    prefundedDeposit(
      _destination: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber, BigNumber]>;
    setOwner(who: string, overrides?: CallOverrides): Promise<void>;
    symbol(overrides?: CallOverrides): Promise<string>;
    token(overrides?: CallOverrides): Promise<string>;
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
    transition(
      newVault: string,
      minOutputShares: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    vault(overrides?: CallOverrides): Promise<string>;
    vaultDecimals(overrides?: CallOverrides): Promise<number>;
    withdraw(
      _destination: string,
      _shares: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    withdrawUnderlying(
      _destination: string,
      _amount: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
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
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    "approve(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    "approve()"(
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
    balanceOfUnderlying(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    conversionRate(overrides?: CallOverrides): Promise<BigNumber>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      _destination: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getSharesToUnderlying(
      _shares: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    isAuthorized(who: string, overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
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
    prefundedDeposit(
      _destination: string,
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
    transition(
      newVault: string,
      minOutputShares: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    vault(overrides?: CallOverrides): Promise<BigNumber>;
    vaultDecimals(overrides?: CallOverrides): Promise<BigNumber>;
    withdraw(
      _destination: string,
      _shares: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    withdrawUnderlying(
      _destination: string,
      _amount: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    "approve(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    "approve()"(
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
    balanceOfUnderlying(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    conversionRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deauthorize(
      who: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      _destination: string,
      _amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getSharesToUnderlying(
      _shares: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isAuthorized(
      who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pause(
      pauseStatus: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    prefundedDeposit(
      _destination: string,
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
    transition(
      newVault: string,
      minOutputShares: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    vaultDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    withdraw(
      _destination: string,
      _shares: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    withdrawUnderlying(
      _destination: string,
      _amount: BigNumberish,
      _minUnderlying: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
