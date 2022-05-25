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
export interface StandardTokenInterface extends utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
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
export interface StandardToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: StandardTokenInterface;
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
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    increaseApproval(
      _spender: string,
      _addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  approve(
    _spender: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  transferFrom(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  decreaseApproval(
    _spender: string,
    _subtractedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  increaseApproval(
    _spender: string,
    _addedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  allowance(
    _owner: string,
    _spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    increaseApproval(
      _spender: string,
      _addedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    allowance(
      _owner: string,
      _spender: string,
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
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    increaseApproval(
      _spender: string,
      _addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      _owner: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    increaseApproval(
      _spender: string,
      _addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    allowance(
      _owner: string,
      _spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
