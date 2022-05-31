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
export interface TrancheInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit(uint256,address)": FunctionFragment;
    "hitSpeedbump()": FunctionFragment;
    "interestSupply()": FunctionFragment;
    "interestToken()": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "position()": FunctionFragment;
    "prefundedDeposit(address)": FunctionFragment;
    "speedbump()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "underlying()": FunctionFragment;
    "unlockTimestamp()": FunctionFragment;
    "valueSupplied()": FunctionFragment;
    "withdrawInterest(uint256,address)": FunctionFragment;
    "withdrawPrincipal(uint256,address)": FunctionFragment;
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
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, string],
  ): string;
  encodeFunctionData(
    functionFragment: "hitSpeedbump",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "interestSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "interestToken",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
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
  encodeFunctionData(functionFragment: "position", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "prefundedDeposit",
    values: [string],
  ): string;
  encodeFunctionData(functionFragment: "speedbump", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
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
    functionFragment: "underlying",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "unlockTimestamp",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "valueSupplied",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawInterest",
    values: [BigNumberish, string],
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawPrincipal",
    values: [BigNumberish, string],
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
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hitSpeedbump",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "interestSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "interestToken",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "position", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "prefundedDeposit",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "speedbump", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlockTimestamp",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "valueSupplied",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawInterest",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawPrincipal",
    data: BytesLike,
  ): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "SpeedBumpHit(uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SpeedBumpHit"): EventFragment;
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
export declare type SpeedBumpHitEvent = TypedEvent<
  [BigNumber],
  {
    timestamp: BigNumber;
  }
>;
export declare type SpeedBumpHitEventFilter =
  TypedEventFilter<SpeedBumpHitEvent>;
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface Tranche extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: TrancheInterface;
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
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    hitSpeedbump(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    interestSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    interestToken(overrides?: CallOverrides): Promise<[string]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
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
    position(overrides?: CallOverrides): Promise<[string]>;
    prefundedDeposit(
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    speedbump(overrides?: CallOverrides): Promise<[BigNumber]>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
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
    underlying(overrides?: CallOverrides): Promise<[string]>;
    unlockTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;
    valueSupplied(overrides?: CallOverrides): Promise<[BigNumber]>;
    withdrawInterest(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    withdrawPrincipal(
      _amount: BigNumberish,
      _destination: string,
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
  approve(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    _amount: BigNumberish,
    _destination: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  hitSpeedbump(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  interestSupply(overrides?: CallOverrides): Promise<BigNumber>;
  interestToken(overrides?: CallOverrides): Promise<string>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
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
  position(overrides?: CallOverrides): Promise<string>;
  prefundedDeposit(
    _destination: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  speedbump(overrides?: CallOverrides): Promise<BigNumber>;
  symbol(overrides?: CallOverrides): Promise<string>;
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
  underlying(overrides?: CallOverrides): Promise<string>;
  unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
  valueSupplied(overrides?: CallOverrides): Promise<BigNumber>;
  withdrawInterest(
    _amount: BigNumberish,
    _destination: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  withdrawPrincipal(
    _amount: BigNumberish,
    _destination: string,
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
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(
      _amount: BigNumberish,
      _destination: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    hitSpeedbump(overrides?: CallOverrides): Promise<void>;
    interestSupply(overrides?: CallOverrides): Promise<BigNumber>;
    interestToken(overrides?: CallOverrides): Promise<string>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    position(overrides?: CallOverrides): Promise<string>;
    prefundedDeposit(
      _destination: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    speedbump(overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
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
    underlying(overrides?: CallOverrides): Promise<string>;
    unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    valueSupplied(overrides?: CallOverrides): Promise<BigNumber>;
    withdrawInterest(
      _amount: BigNumberish,
      _destination: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    withdrawPrincipal(
      _amount: BigNumberish,
      _destination: string,
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
    "SpeedBumpHit(uint256)"(timestamp?: null): SpeedBumpHitEventFilter;
    SpeedBumpHit(timestamp?: null): SpeedBumpHitEventFilter;
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
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    hitSpeedbump(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    interestSupply(overrides?: CallOverrides): Promise<BigNumber>;
    interestToken(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    position(overrides?: CallOverrides): Promise<BigNumber>;
    prefundedDeposit(
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    speedbump(overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
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
    underlying(overrides?: CallOverrides): Promise<BigNumber>;
    unlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>;
    valueSupplied(overrides?: CallOverrides): Promise<BigNumber>;
    withdrawInterest(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    withdrawPrincipal(
      _amount: BigNumberish,
      _destination: string,
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
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    hitSpeedbump(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    interestSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    interestToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
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
    position(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    prefundedDeposit(
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    speedbump(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    underlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    unlockTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    valueSupplied(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    withdrawInterest(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    withdrawPrincipal(
      _amount: BigNumberish,
      _destination: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
