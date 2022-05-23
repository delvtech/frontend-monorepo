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
export interface MintableTokenInterface extends utils.Interface {
  functions: {
    "mintingFinished()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "finishMinting()": FunctionFragment;
    "owner()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "mintingFinished",
    values?: undefined,
  ): string;
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
    functionFragment: "mint",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "finishMinting",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
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
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "mintingFinished",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "finishMinting",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "Mint(address,uint256)": EventFragment;
    "MintFinished()": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MintFinished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export declare type MintEvent = TypedEvent<
  [string, BigNumber],
  {
    to: string;
    amount: BigNumber;
  }
>;
export declare type MintEventFilter = TypedEventFilter<MintEvent>;
export declare type MintFinishedEvent = TypedEvent<[], {}>;
export declare type MintFinishedEventFilter =
  TypedEventFilter<MintFinishedEvent>;
export declare type OwnershipRenouncedEvent = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
export declare type OwnershipRenouncedEventFilter =
  TypedEventFilter<OwnershipRenouncedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
export declare type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;
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
export interface MintableToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MintableTokenInterface;
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
    mintingFinished(overrides?: CallOverrides): Promise<[boolean]>;
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
    mint(
      _to: string,
      _amount: BigNumberish,
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
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    finishMinting(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
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
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  mintingFinished(overrides?: CallOverrides): Promise<boolean>;
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
  mint(
    _to: string,
    _amount: BigNumberish,
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
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  finishMinting(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
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
  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    mintingFinished(overrides?: CallOverrides): Promise<boolean>;
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
    mint(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    finishMinting(overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
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
    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "Mint(address,uint256)"(to?: string | null, amount?: null): MintEventFilter;
    Mint(to?: string | null, amount?: null): MintEventFilter;
    "MintFinished()"(): MintFinishedEventFilter;
    MintFinished(): MintFinishedEventFilter;
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): OwnershipRenouncedEventFilter;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): OwnershipRenouncedEventFilter;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
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
    mintingFinished(overrides?: CallOverrides): Promise<BigNumber>;
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
    mint(
      _to: string,
      _amount: BigNumberish,
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
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    finishMinting(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
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
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    mintingFinished(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    mint(
      _to: string,
      _amount: BigNumberish,
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
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    finishMinting(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
