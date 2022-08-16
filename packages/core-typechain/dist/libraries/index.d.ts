import {
  Listener,
  Provider,
  TransactionRequest,
} from "@ethersproject/providers";
import {
  Event,
  EventFilter,
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
  PayableOverrides,
  ContractFactory,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
interface TypedEvent<TArgsArray extends Array<any> = any, TArgsObject = any>
  extends Event {
  args: TArgsArray & TArgsObject;
}
interface TypedEventFilter<_TEvent extends TypedEvent> extends EventFilter {}
interface TypedListener<TEvent extends TypedEvent> {
  (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void;
}
type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never;
interface OnEvent<TRes> {
  <TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
    listener: TypedListener<TEvent>,
  ): TRes;
  (eventName: string, listener: Listener): TRes;
}
interface ERC20Interface extends utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
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
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transfer",
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
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface ERC20 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ERC20Interface;
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
    balanceOf(_who: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
  balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    _to: string,
    _value: BigNumberish,
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
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
    balanceOf(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
interface ERC20PermitInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
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
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish],
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
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
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
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent1 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter1 = TypedEventFilter<_ApprovalEvent1>;
type _TransferEvent1 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter1 = TypedEventFilter<_TransferEvent1>;
export interface ERC20Permit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ERC20PermitInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter1;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter1;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter1;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter1;
  };
  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      owner: string,
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface IERC20PermitInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined,
  ): string;
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
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  events: {};
}
export interface IERC20Permit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IERC20PermitInterface;
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
    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
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
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
  };
  filters: {};
  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      owner: string,
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
  };
}
interface IERC20MetadataInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };
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
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
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
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
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
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent2 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter2 = TypedEventFilter<_ApprovalEvent2>;
type _TransferEvent2 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter2 = TypedEventFilter<_TransferEvent2>;
export interface IERC20Metadata extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IERC20MetadataInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    name(overrides?: CallOverrides): Promise<[string]>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  name(overrides?: CallOverrides): Promise<string>;
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
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    name(overrides?: CallOverrides): Promise<string>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter2;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter2;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter2;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter2;
  };
  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface IERC20Interface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
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
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent3 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter3 = TypedEventFilter<_ApprovalEvent3>;
type _TransferEvent3 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter3 = TypedEventFilter<_TransferEvent3>;
export interface IERC20 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IERC20Interface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter3;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter3;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter3;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter3;
  };
  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface CurveStethPoolInterface extends utils.Interface {
  functions: {
    "calc_withdraw_one_coin(uint256,int128)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "calc_withdraw_one_coin",
    values: [BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "calc_withdraw_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CurveStethPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CurveStethPoolInterface;
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
    calc_withdraw_one_coin(
      _token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  calc_withdraw_one_coin(
    _token_amount: BigNumberish,
    i: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    calc_withdraw_one_coin(
      _token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    calc_withdraw_one_coin(
      _token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    calc_withdraw_one_coin(
      _token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
interface CurveContractInterface extends utils.Interface {
  functions: {
    "calc_withdraw_one_coin(uint256,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "calc_withdraw_one_coin",
    values: [BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "calc_withdraw_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CurveContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CurveContractInterface;
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
    calc_withdraw_one_coin(
      token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  calc_withdraw_one_coin(
    token_amount: BigNumberish,
    i: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    calc_withdraw_one_coin(
      token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    calc_withdraw_one_coin(
      token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    calc_withdraw_one_coin(
      token_amount: BigNumberish,
      i: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
interface CurvePool1Interface extends utils.Interface {
  functions: {
    "calc_token_amount(uint256[2],bool)": FunctionFragment;
    "calc_withdraw_one_coin(uint256,int128)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "calc_token_amount",
    values: [[BigNumberish, BigNumberish], boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "calc_withdraw_one_coin",
    values: [BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "calc_token_amount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "calc_withdraw_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CurvePool1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CurvePool1Interface;
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
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  calc_token_amount(
    amounts: [BigNumberish, BigNumberish],
    isDeposit: boolean,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  calc_withdraw_one_coin(
    amount: BigNumberish,
    selector: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
interface CurvePool2Interface extends utils.Interface {
  functions: {
    "calc_token_amount(uint256[3],bool)": FunctionFragment;
    "calc_withdraw_one_coin(uint256,int128)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "calc_token_amount",
    values: [[BigNumberish, BigNumberish, BigNumberish], boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "calc_withdraw_one_coin",
    values: [BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "calc_token_amount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "calc_withdraw_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CurvePool2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CurvePool2Interface;
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
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  calc_token_amount(
    amounts: [BigNumberish, BigNumberish, BigNumberish],
    isDeposit: boolean,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  calc_withdraw_one_coin(
    amount: BigNumberish,
    selector: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
interface CurvePool3Interface extends utils.Interface {
  functions: {
    "calc_token_amount(uint256[3],bool)": FunctionFragment;
    "calc_withdraw_one_coin(uint256,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "calc_token_amount",
    values: [[BigNumberish, BigNumberish, BigNumberish], boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "calc_withdraw_one_coin",
    values: [BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "calc_token_amount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "calc_withdraw_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface CurvePool3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CurvePool3Interface;
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
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
  };
  calc_token_amount(
    amounts: [BigNumberish, BigNumberish, BigNumberish],
    isDeposit: boolean,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  calc_withdraw_one_coin(
    amount: BigNumberish,
    selector: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  callStatic: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    calc_token_amount(
      amounts: [BigNumberish, BigNumberish, BigNumberish],
      isDeposit: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    calc_withdraw_one_coin(
      amount: BigNumberish,
      selector: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
interface DAIInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };
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
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
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
    functionFragment: "withdraw",
    values: [BigNumberish],
  ): string;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent4 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter4 = TypedEventFilter<_ApprovalEvent4>;
type _TransferEvent4 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter4 = TypedEventFilter<_TransferEvent4>;
export interface DAI extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: DAIInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mint(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
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
  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(overrides?: CallOverrides): Promise<void>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
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
    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter4;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter4;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter4;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter4;
  };
  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
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
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface LUSDInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };
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
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
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
    functionFragment: "withdraw",
    values: [BigNumberish],
  ): string;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent5 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter5 = TypedEventFilter<_ApprovalEvent5>;
type _TransferEvent5 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter5 = TypedEventFilter<_TransferEvent5>;
export interface LUSD extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: LUSDInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mint(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
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
  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(overrides?: CallOverrides): Promise<void>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
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
    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter5;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter5;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter5;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter5;
  };
  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
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
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface USDCInterface extends utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
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
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish],
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
  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
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
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent6 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter6 = TypedEventFilter<_ApprovalEvent6>;
type _TransferEvent6 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter6 = TypedEventFilter<_TransferEvent6>;
export interface USDC extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: USDCInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mint(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    transferFrom(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter6;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter6;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter6;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter6;
  };
  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOf(
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(
      owner: string,
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
      sender: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface BasicTokenInterface extends utils.Interface {
  functions: {
    "totalSupply()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  events: {
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _TransferEvent7 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter7 = TypedEventFilter<_TransferEvent7>;
export interface BasicToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BasicTokenInterface;
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
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter7;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter7;
  };
  estimateGas: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
  };
}
interface BurnableTokenInterface extends utils.Interface {
  functions: {
    "totalSupply()": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  events: {
    "Burn(address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type BurnEvent = TypedEvent<
  [string, BigNumber],
  {
    burner: string;
    value: BigNumber;
  }
>;
type BurnEventFilter = TypedEventFilter<BurnEvent>;
type _TransferEvent8 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter8 = TypedEventFilter<_TransferEvent8>;
export interface BurnableToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BurnableTokenInterface;
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
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    burn(
      _value: BigNumberish,
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
  };
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  burn(
    _value: BigNumberish,
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
  callStatic: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    burn(_value: BigNumberish, overrides?: CallOverrides): Promise<void>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Burn(address,uint256)"(
      burner?: string | null,
      value?: null,
    ): BurnEventFilter;
    Burn(burner?: string | null, value?: null): BurnEventFilter;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter8;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter8;
  };
  estimateGas: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    burn(
      _value: BigNumberish,
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
  };
  populateTransaction: {
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    burn(
      _value: BigNumberish,
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
  };
}
interface CanReclaimTokenInterface extends utils.Interface {
  functions: {
    "reclaimToken(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "reclaimToken",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "reclaimToken",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
type OwnershipRenouncedEvent = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type OwnershipRenouncedEventFilter = TypedEventFilter<OwnershipRenouncedEvent>;
type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;
export interface CanReclaimToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CanReclaimTokenInterface;
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
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  reclaimToken(
    _token: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    reclaimToken(_token: string, overrides?: CallOverrides): Promise<void>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
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
  };
  estimateGas: {
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface ClaimableInterface extends utils.Interface {
  functions: {
    "claimOwnership()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "claimOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "claimOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
type _OwnershipRenouncedEvent1 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter1 =
  TypedEventFilter<_OwnershipRenouncedEvent1>;
type _OwnershipTransferredEvent1 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter1 =
  TypedEventFilter<_OwnershipTransferredEvent1>;
export interface Claimable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ClaimableInterface;
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
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    pendingOwner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  claimOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  pendingOwner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    claimOwnership(overrides?: CallOverrides): Promise<void>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter1;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter1;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter1;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter1;
  };
  estimateGas: {
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface DetailedERC20Interface extends utils.Interface {
  functions: {
    "name()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
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
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string],
  ): string;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent7 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter7 = TypedEventFilter<_ApprovalEvent7>;
type _TransferEvent9 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter9 = TypedEventFilter<_TransferEvent9>;
export interface DetailedERC20 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: DetailedERC20Interface;
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
    name(overrides?: CallOverrides): Promise<[string]>;
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
    decimals(overrides?: CallOverrides): Promise<[number]>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
  name(overrides?: CallOverrides): Promise<string>;
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
  decimals(overrides?: CallOverrides): Promise<number>;
  balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
  symbol(overrides?: CallOverrides): Promise<string>;
  transfer(
    _to: string,
    _value: BigNumberish,
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
    name(overrides?: CallOverrides): Promise<string>;
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
    decimals(overrides?: CallOverrides): Promise<number>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
    ): _ApprovalEventFilter7;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter7;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter9;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter9;
  };
  estimateGas: {
    name(overrides?: CallOverrides): Promise<BigNumber>;
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
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    balanceOf(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transfer(
      _to: string,
      _value: BigNumberish,
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
interface ERC20BasicInterface extends utils.Interface {
  functions: {
    "totalSupply()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  events: {
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _TransferEvent10 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter10 = TypedEventFilter<_TransferEvent10>;
export interface ERC20Basic extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ERC20BasicInterface;
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
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter10;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter10;
  };
  estimateGas: {
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    balanceOf(_who: string, overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    balanceOf(
      _who: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    transfer(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface MintableTokenInterface extends utils.Interface {
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
type MintEvent = TypedEvent<
  [string, BigNumber],
  {
    to: string;
    amount: BigNumber;
  }
>;
type MintEventFilter = TypedEventFilter<MintEvent>;
type MintFinishedEvent = TypedEvent<[], {}>;
type MintFinishedEventFilter = TypedEventFilter<MintFinishedEvent>;
type _OwnershipRenouncedEvent2 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter2 =
  TypedEventFilter<_OwnershipRenouncedEvent2>;
type _OwnershipTransferredEvent2 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter2 =
  TypedEventFilter<_OwnershipTransferredEvent2>;
type _ApprovalEvent8 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter8 = TypedEventFilter<_ApprovalEvent8>;
type _TransferEvent11 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter11 = TypedEventFilter<_TransferEvent11>;
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
    ): _OwnershipRenouncedEventFilter2;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter2;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter2;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter2;
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter8;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter8;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter11;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter11;
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
interface OwnableInterface extends utils.Interface {
  functions: {
    "renounceOwnership()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
type _OwnershipRenouncedEvent3 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter3 =
  TypedEventFilter<_OwnershipRenouncedEvent3>;
type _OwnershipTransferredEvent3 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter3 =
  TypedEventFilter<_OwnershipTransferredEvent3>;
export interface Ownable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: OwnableInterface;
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
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter3;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter3;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter3;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter3;
  };
  estimateGas: {
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface OwnableContractInterface extends utils.Interface {
  functions: {
    "reclaimToken(address)": FunctionFragment;
    "claimOwnership()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "reclaimToken",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "claimOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "reclaimToken",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
type _OwnershipRenouncedEvent4 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter4 =
  TypedEventFilter<_OwnershipRenouncedEvent4>;
type _OwnershipTransferredEvent4 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter4 =
  TypedEventFilter<_OwnershipTransferredEvent4>;
export interface OwnableContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: OwnableContractInterface;
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
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    pendingOwner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  reclaimToken(
    _token: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  claimOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  pendingOwner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    reclaimToken(_token: string, overrides?: CallOverrides): Promise<void>;
    claimOwnership(overrides?: CallOverrides): Promise<void>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter4;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter4;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter4;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter4;
  };
  estimateGas: {
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    reclaimToken(
      _token: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface PausableInterface extends utils.Interface {
  functions: {
    "unpause()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "pause()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "Pause()": EventFragment;
    "Unpause()": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Pause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
type PauseEvent = TypedEvent<[], {}>;
type PauseEventFilter = TypedEventFilter<PauseEvent>;
type UnpauseEvent = TypedEvent<[], {}>;
type UnpauseEventFilter = TypedEventFilter<UnpauseEvent>;
type _OwnershipRenouncedEvent5 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter5 =
  TypedEventFilter<_OwnershipRenouncedEvent5>;
type _OwnershipTransferredEvent5 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter5 =
  TypedEventFilter<_OwnershipTransferredEvent5>;
export interface Pausable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: PausableInterface;
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
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  unpause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
  renounceOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  pause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    _newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    unpause(overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    pause(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      _newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "Pause()"(): PauseEventFilter;
    Pause(): PauseEventFilter;
    "Unpause()"(): UnpauseEventFilter;
    Unpause(): UnpauseEventFilter;
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter5;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter5;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter5;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter5;
  };
  estimateGas: {
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    renounceOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      _newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface PausableTokenInterface extends utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "unpause()": FunctionFragment;
    "paused()": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "pause()": FunctionFragment;
    "owner()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
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
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseApproval",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
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
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
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
    "Pause()": EventFragment;
    "Unpause()": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Pause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _PauseEvent1 = TypedEvent<[], {}>;
type _PauseEventFilter1 = TypedEventFilter<_PauseEvent1>;
type _UnpauseEvent1 = TypedEvent<[], {}>;
type _UnpauseEventFilter1 = TypedEventFilter<_UnpauseEvent1>;
type _OwnershipRenouncedEvent6 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter6 =
  TypedEventFilter<_OwnershipRenouncedEvent6>;
type _OwnershipTransferredEvent6 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter6 =
  TypedEventFilter<_OwnershipTransferredEvent6>;
type _ApprovalEvent9 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter9 = TypedEventFilter<_ApprovalEvent9>;
type _TransferEvent12 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter12 = TypedEventFilter<_TransferEvent12>;
export interface PausableToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: PausableTokenInterface;
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
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
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
    pause(
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
  unpause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
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
  pause(
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
    unpause(overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    pause(overrides?: CallOverrides): Promise<void>;
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
    "Pause()"(): _PauseEventFilter1;
    Pause(): _PauseEventFilter1;
    "Unpause()"(): _UnpauseEventFilter1;
    Unpause(): _UnpauseEventFilter1;
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter6;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter6;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter6;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter6;
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter9;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter9;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter12;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter12;
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
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
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
    pause(
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
    unpause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    pause(
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
interface StandardTokenInterface extends utils.Interface {
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
type _ApprovalEvent10 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter10 = TypedEventFilter<_ApprovalEvent10>;
type _TransferEvent13 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter13 = TypedEventFilter<_TransferEvent13>;
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
    ): _ApprovalEventFilter10;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter10;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter13;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter13;
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
interface WBTCInterface extends utils.Interface {
  functions: {
    "mintingFinished()": FunctionFragment;
    "name()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "reclaimToken(address)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "unpause()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "claimOwnership()": FunctionFragment;
    "paused()": FunctionFragment;
    "decreaseApproval(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "finishMinting()": FunctionFragment;
    "pause()": FunctionFragment;
    "owner()": FunctionFragment;
    "symbol()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "increaseApproval(address,uint256)": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "mintingFinished",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "reclaimToken",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "claimOwnership",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
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
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
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
    functionFragment: "pendingOwner",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string],
  ): string;
  decodeFunctionResult(
    functionFragment: "mintingFinished",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reclaimToken",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimOwnership",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseApproval",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike,
  ): Result;
  events: {
    "Pause()": EventFragment;
    "Unpause()": EventFragment;
    "Burn(address,uint256)": EventFragment;
    "Mint(address,uint256)": EventFragment;
    "MintFinished()": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Pause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpause"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MintFinished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _PauseEvent2 = TypedEvent<[], {}>;
type _PauseEventFilter2 = TypedEventFilter<_PauseEvent2>;
type _UnpauseEvent2 = TypedEvent<[], {}>;
type _UnpauseEventFilter2 = TypedEventFilter<_UnpauseEvent2>;
type _BurnEvent1 = TypedEvent<
  [string, BigNumber],
  {
    burner: string;
    value: BigNumber;
  }
>;
type _BurnEventFilter1 = TypedEventFilter<_BurnEvent1>;
type _MintEvent1 = TypedEvent<
  [string, BigNumber],
  {
    to: string;
    amount: BigNumber;
  }
>;
type _MintEventFilter1 = TypedEventFilter<_MintEvent1>;
type _MintFinishedEvent1 = TypedEvent<[], {}>;
type _MintFinishedEventFilter1 = TypedEventFilter<_MintFinishedEvent1>;
type _OwnershipRenouncedEvent7 = TypedEvent<
  [string],
  {
    previousOwner: string;
  }
>;
type _OwnershipRenouncedEventFilter7 =
  TypedEventFilter<_OwnershipRenouncedEvent7>;
type _OwnershipTransferredEvent7 = TypedEvent<
  [string, string],
  {
    previousOwner: string;
    newOwner: string;
  }
>;
type _OwnershipTransferredEventFilter7 =
  TypedEventFilter<_OwnershipTransferredEvent7>;
type _ApprovalEvent11 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter11 = TypedEventFilter<_ApprovalEvent11>;
type _TransferEvent14 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter14 = TypedEventFilter<_TransferEvent14>;
export interface WBTC extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: WBTCInterface;
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
    name(overrides?: CallOverrides): Promise<[string]>;
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    reclaimToken(
      _token: string,
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
    decimals(overrides?: CallOverrides): Promise<[number]>;
    unpause(
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
    burn(
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<[boolean]>;
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
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<[string]>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
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
    pendingOwner(overrides?: CallOverrides): Promise<[string]>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  mintingFinished(overrides?: CallOverrides): Promise<boolean>;
  name(overrides?: CallOverrides): Promise<string>;
  approve(
    _spender: string,
    _value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  reclaimToken(
    _token: string,
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
  decimals(overrides?: CallOverrides): Promise<number>;
  unpause(
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
  burn(
    value: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  claimOwnership(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  paused(overrides?: CallOverrides): Promise<boolean>;
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
  pause(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  owner(overrides?: CallOverrides): Promise<string>;
  symbol(overrides?: CallOverrides): Promise<string>;
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
  pendingOwner(overrides?: CallOverrides): Promise<string>;
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    mintingFinished(overrides?: CallOverrides): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    reclaimToken(_token: string, overrides?: CallOverrides): Promise<void>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    decimals(overrides?: CallOverrides): Promise<number>;
    unpause(overrides?: CallOverrides): Promise<void>;
    mint(
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    burn(value: BigNumberish, overrides?: CallOverrides): Promise<void>;
    claimOwnership(overrides?: CallOverrides): Promise<void>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    decreaseApproval(
      _spender: string,
      _subtractedValue: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: CallOverrides): Promise<void>;
    finishMinting(overrides?: CallOverrides): Promise<boolean>;
    pause(overrides?: CallOverrides): Promise<void>;
    owner(overrides?: CallOverrides): Promise<string>;
    symbol(overrides?: CallOverrides): Promise<string>;
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
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "Pause()"(): _PauseEventFilter2;
    Pause(): _PauseEventFilter2;
    "Unpause()"(): _UnpauseEventFilter2;
    Unpause(): _UnpauseEventFilter2;
    "Burn(address,uint256)"(
      burner?: string | null,
      value?: null,
    ): _BurnEventFilter1;
    Burn(burner?: string | null, value?: null): _BurnEventFilter1;
    "Mint(address,uint256)"(
      to?: string | null,
      amount?: null,
    ): _MintEventFilter1;
    Mint(to?: string | null, amount?: null): _MintEventFilter1;
    "MintFinished()"(): _MintFinishedEventFilter1;
    MintFinished(): _MintFinishedEventFilter1;
    "OwnershipRenounced(address)"(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter7;
    OwnershipRenounced(
      previousOwner?: string | null,
    ): _OwnershipRenouncedEventFilter7;
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter7;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): _OwnershipTransferredEventFilter7;
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter11;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter11;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter14;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter14;
  };
  estimateGas: {
    mintingFinished(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    reclaimToken(
      _token: string,
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
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    unpause(
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
    burn(
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    paused(overrides?: CallOverrides): Promise<BigNumber>;
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
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
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
    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    mintingFinished(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    approve(
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    reclaimToken(
      _token: string,
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
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    unpause(
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
    burn(
      value: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    claimOwnership(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    pause(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
interface WETHInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };
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
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
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
    functionFragment: "withdraw",
    values: [BigNumberish],
  ): string;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
type _ApprovalEvent12 = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;
type _ApprovalEventFilter12 = TypedEventFilter<_ApprovalEvent12>;
type _TransferEvent15 = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
type _TransferEventFilter15 = TypedEventFilter<_TransferEvent15>;
export interface WETH extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: WETHInterface;
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
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<[string]>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  approve(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  decimals(overrides?: CallOverrides): Promise<number>;
  deposit(
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mint(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  name(overrides?: CallOverrides): Promise<string>;
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
  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<number>;
    deposit(overrides?: CallOverrides): Promise<void>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    name(overrides?: CallOverrides): Promise<string>;
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
    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };
  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter12;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null,
    ): _ApprovalEventFilter12;
    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter15;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): _TransferEventFilter15;
  };
  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    approve(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
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
      account: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    deposit(
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mint(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
export class ERC20__factory {
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): ERC20Interface;
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
export class ERC20Permit__factory {
  static readonly abi: (
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): ERC20PermitInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ERC20Permit;
}
export class IERC20Permit__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): IERC20PermitInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IERC20Permit;
}
export class IERC20Metadata__factory {
  static readonly abi: (
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): IERC20MetadataInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IERC20Metadata;
}
export class IERC20__factory {
  static readonly abi: (
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): IERC20Interface;
  static connect(address: string, signerOrProvider: Signer | Provider): IERC20;
}
export class CurveStethPool__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CurveStethPoolInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurveStethPool;
}
export class CurveContract__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CurveContractInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurveContract;
}
export class CurvePool1__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CurvePool1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool1;
}
export class CurvePool2__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CurvePool2Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool2;
}
export class CurvePool3__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CurvePool3Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool3;
}
type DAIConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class DAI__factory extends ContractFactory {
  constructor(...args: DAIConstructorParams);
  deploy(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<DAI>;
  getDeployTransaction(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): DAI;
  connect(signer: Signer): DAI__factory;
  static readonly bytecode =
    "0x60806040523480156200001157600080fd5b50604051620016df380380620016df833981810160405281019062000037919062000404565b6040518060400160405280600f81526020017f44414920737461626c6520636f696e00000000000000000000000000000000008152506040518060400160405280600381526020017f44414900000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb9291906200033d565b508060019080519060200190620000d49291906200033d565b506012600260006101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050620001cd6012620001f760201b60201c565b620001f0817002f050fe938943acc45f655680000000006200021560201b60201c565b50620005a7565b80600260006101000a81548160ff021916908360ff16021790555050565b6200022782826200022b60201b60201c565b5050565b806003546200023b91906200045e565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200028e91906200045e565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000331919062000441565b60405180910390a35050565b8280546200034b90620004f9565b90600052602060002090601f0160209004810192826200036f5760008555620003bb565b82601f106200038a57805160ff1916838001178555620003bb565b82800160010185558215620003bb579182015b82811115620003ba5782518255916020019190600101906200039d565b5b509050620003ca9190620003ce565b5090565b5b80821115620003e9576000816000905550600101620003cf565b5090565b600081519050620003fe816200058d565b92915050565b6000602082840312156200041757600080fd5b60006200042784828501620003ed565b91505092915050565b6200043b81620004ef565b82525050565b600060208201905062000458600083018462000430565b92915050565b60006200046b82620004ef565b91506200047883620004ef565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004b057620004af6200052f565b5b828201905092915050565b6000620004c882620004cf565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060028204905060018216806200051257607f821691505b602082108114156200052957620005286200055e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6200059881620004bb565b8114620005a457600080fd5b50565b61112880620005b76000396000f3fe6080604052600436106100a75760003560e01c806340c10f191161006457806340c10f19146101d057806370a08231146101f957806395d89b4114610236578063a9059cbb14610261578063d0e30db01461029e578063dd62ed3e146102a8576100a7565b806306fdde03146100ac578063095ea7b3146100d757806318160ddd1461011457806323b872dd1461013f5780632e1a7d4d1461017c578063313ce567146101a5575b600080fd5b3480156100b857600080fd5b506100c16102e5565b6040516100ce9190610e5d565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f99190610cf7565b610373565b60405161010b9190610e42565b60405180910390f35b34801561012057600080fd5b50610129610465565b6040516101369190610ebf565b60405180910390f35b34801561014b57600080fd5b5061016660048036038101906101619190610ca8565b61046f565b6040516101739190610e42565b60405180910390f35b34801561018857600080fd5b506101a3600480360381019061019e9190610d33565b6107f8565b005b3480156101b157600080fd5b506101ba610861565b6040516101c79190610eda565b60405180910390f35b3480156101dc57600080fd5b506101f760048036038101906101f29190610cf7565b610874565b005b34801561020557600080fd5b50610220600480360381019061021b9190610c43565b610882565b60405161022d9190610ebf565b60405180910390f35b34801561024257600080fd5b5061024b6108cb565b6040516102589190610e5d565b60405180910390f35b34801561026d57600080fd5b5061028860048036038101906102839190610cf7565b610959565b6040516102959190610e42565b60405180910390f35b6102a661096e565b005b3480156102b457600080fd5b506102cf60048036038101906102ca9190610c6c565b61097a565b6040516102dc9190610ebf565b60405180910390f35b600080546102f290611023565b80601f016020809104026020016040519081016040528092919081815260200182805461031e90611023565b801561036b5780601f106103405761010080835404028352916020019161036b565b820191906000526020600020905b81548152906001019060200180831161034e57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104539190610ebf565b60405180910390a36001905092915050565b6000600354905090565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083821015610578576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056f90610e9f565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156105d457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114155b156106a9578381101561061c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061390610e7f565b60405180910390fd5b83816106289190610f67565b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b83826106b59190610f67565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555083600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107439190610f11565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040516107e39190610ebf565b60405180910390a36001925050509392505050565b8061080233610882565b101561080d57600080fd5b6108173382610a01565b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561085d573d6000803e3d6000fd5b5050565b600260009054906101000a900460ff1681565b61087e8282610b0d565b5050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600180546108d890611023565b80601f016020809104026020016040519081016040528092919081815260200182805461090490611023565b80156109515780601f1061092657610100808354040283529160200191610951565b820191906000526020600020905b81548152906001019060200180831161093457829003601f168201915b505050505081565b600061096633848461046f565b905092915050565b6109783334610b0d565b565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b80600354610a0f9190610f67565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a609190610f67565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b019190610ebf565b60405180910390a35050565b80600354610b1b9190610f11565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610b6c9190610f11565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c0d9190610ebf565b60405180910390a35050565b600081359050610c28816110c4565b92915050565b600081359050610c3d816110db565b92915050565b600060208284031215610c5557600080fd5b6000610c6384828501610c19565b91505092915050565b60008060408385031215610c7f57600080fd5b6000610c8d85828601610c19565b9250506020610c9e85828601610c19565b9150509250929050565b600080600060608486031215610cbd57600080fd5b6000610ccb86828701610c19565b9350506020610cdc86828701610c19565b9250506040610ced86828701610c2e565b9150509250925092565b60008060408385031215610d0a57600080fd5b6000610d1885828601610c19565b9250506020610d2985828601610c2e565b9150509250929050565b600060208284031215610d4557600080fd5b6000610d5384828501610c2e565b91505092915050565b610d6581610fad565b82525050565b6000610d7682610ef5565b610d808185610f00565b9350610d90818560208601610ff0565b610d99816110b3565b840191505092915050565b6000610db1601d83610f00565b91507f45524332303a20696e73756666696369656e742d616c6c6f77616e63650000006000830152602082019050919050565b6000610df1601b83610f00565b91507f45524332303a20696e73756666696369656e742d62616c616e636500000000006000830152602082019050919050565b610e2d81610fd9565b82525050565b610e3c81610fe3565b82525050565b6000602082019050610e576000830184610d5c565b92915050565b60006020820190508181036000830152610e778184610d6b565b905092915050565b60006020820190508181036000830152610e9881610da4565b9050919050565b60006020820190508181036000830152610eb881610de4565b9050919050565b6000602082019050610ed46000830184610e24565b92915050565b6000602082019050610eef6000830184610e33565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f1c82610fd9565b9150610f2783610fd9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f5c57610f5b611055565b5b828201905092915050565b6000610f7282610fd9565b9150610f7d83610fd9565b925082821015610f9057610f8f611055565b5b828203905092915050565b6000610fa682610fb9565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561100e578082015181840152602081019050610ff3565b8381111561101d576000848401525b50505050565b6000600282049050600182168061103b57607f821691505b6020821081141561104f5761104e611084565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b6110cd81610f9b565b81146110d857600080fd5b50565b6110e481610fd9565b81146110ef57600080fd5b5056fea2646970667358221220c2284afcade53b9e896417d6a0ff8ffc60e001bede303d65b7c2d71b7e019ac864736f6c63430008000033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): DAIInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): DAI;
}
type LUSDConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class LUSD__factory extends ContractFactory {
  constructor(...args: LUSDConstructorParams);
  deploy(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<LUSD>;
  getDeployTransaction(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): LUSD;
  connect(signer: Signer): LUSD__factory;
  static readonly bytecode =
    "0x60806040523480156200001157600080fd5b50604051620016df380380620016df833981810160405281019062000037919062000404565b6040518060400160405280600b81526020017f4c697175697479205553440000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4c555344000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb9291906200033d565b508060019080519060200190620000d49291906200033d565b506012600260006101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050620001cd6012620001f760201b60201c565b620001f0817002f050fe938943acc45f655680000000006200021560201b60201c565b50620005a7565b80600260006101000a81548160ff021916908360ff16021790555050565b6200022782826200022b60201b60201c565b5050565b806003546200023b91906200045e565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200028e91906200045e565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000331919062000441565b60405180910390a35050565b8280546200034b90620004f9565b90600052602060002090601f0160209004810192826200036f5760008555620003bb565b82601f106200038a57805160ff1916838001178555620003bb565b82800160010185558215620003bb579182015b82811115620003ba5782518255916020019190600101906200039d565b5b509050620003ca9190620003ce565b5090565b5b80821115620003e9576000816000905550600101620003cf565b5090565b600081519050620003fe816200058d565b92915050565b6000602082840312156200041757600080fd5b60006200042784828501620003ed565b91505092915050565b6200043b81620004ef565b82525050565b600060208201905062000458600083018462000430565b92915050565b60006200046b82620004ef565b91506200047883620004ef565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004b057620004af6200052f565b5b828201905092915050565b6000620004c882620004cf565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060028204905060018216806200051257607f821691505b602082108114156200052957620005286200055e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6200059881620004bb565b8114620005a457600080fd5b50565b61112880620005b76000396000f3fe6080604052600436106100a75760003560e01c806340c10f191161006457806340c10f19146101d057806370a08231146101f957806395d89b4114610236578063a9059cbb14610261578063d0e30db01461029e578063dd62ed3e146102a8576100a7565b806306fdde03146100ac578063095ea7b3146100d757806318160ddd1461011457806323b872dd1461013f5780632e1a7d4d1461017c578063313ce567146101a5575b600080fd5b3480156100b857600080fd5b506100c16102e5565b6040516100ce9190610e5d565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f99190610cf7565b610373565b60405161010b9190610e42565b60405180910390f35b34801561012057600080fd5b50610129610465565b6040516101369190610ebf565b60405180910390f35b34801561014b57600080fd5b5061016660048036038101906101619190610ca8565b61046f565b6040516101739190610e42565b60405180910390f35b34801561018857600080fd5b506101a3600480360381019061019e9190610d33565b6107f8565b005b3480156101b157600080fd5b506101ba610861565b6040516101c79190610eda565b60405180910390f35b3480156101dc57600080fd5b506101f760048036038101906101f29190610cf7565b610874565b005b34801561020557600080fd5b50610220600480360381019061021b9190610c43565b610882565b60405161022d9190610ebf565b60405180910390f35b34801561024257600080fd5b5061024b6108cb565b6040516102589190610e5d565b60405180910390f35b34801561026d57600080fd5b5061028860048036038101906102839190610cf7565b610959565b6040516102959190610e42565b60405180910390f35b6102a661096e565b005b3480156102b457600080fd5b506102cf60048036038101906102ca9190610c6c565b61097a565b6040516102dc9190610ebf565b60405180910390f35b600080546102f290611023565b80601f016020809104026020016040519081016040528092919081815260200182805461031e90611023565b801561036b5780601f106103405761010080835404028352916020019161036b565b820191906000526020600020905b81548152906001019060200180831161034e57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104539190610ebf565b60405180910390a36001905092915050565b6000600354905090565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083821015610578576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056f90610e9f565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156105d457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114155b156106a9578381101561061c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061390610e7f565b60405180910390fd5b83816106289190610f67565b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b83826106b59190610f67565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555083600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107439190610f11565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040516107e39190610ebf565b60405180910390a36001925050509392505050565b8061080233610882565b101561080d57600080fd5b6108173382610a01565b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561085d573d6000803e3d6000fd5b5050565b600260009054906101000a900460ff1681565b61087e8282610b0d565b5050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600180546108d890611023565b80601f016020809104026020016040519081016040528092919081815260200182805461090490611023565b80156109515780601f1061092657610100808354040283529160200191610951565b820191906000526020600020905b81548152906001019060200180831161093457829003601f168201915b505050505081565b600061096633848461046f565b905092915050565b6109783334610b0d565b565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b80600354610a0f9190610f67565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a609190610f67565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b019190610ebf565b60405180910390a35050565b80600354610b1b9190610f11565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610b6c9190610f11565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c0d9190610ebf565b60405180910390a35050565b600081359050610c28816110c4565b92915050565b600081359050610c3d816110db565b92915050565b600060208284031215610c5557600080fd5b6000610c6384828501610c19565b91505092915050565b60008060408385031215610c7f57600080fd5b6000610c8d85828601610c19565b9250506020610c9e85828601610c19565b9150509250929050565b600080600060608486031215610cbd57600080fd5b6000610ccb86828701610c19565b9350506020610cdc86828701610c19565b9250506040610ced86828701610c2e565b9150509250925092565b60008060408385031215610d0a57600080fd5b6000610d1885828601610c19565b9250506020610d2985828601610c2e565b9150509250929050565b600060208284031215610d4557600080fd5b6000610d5384828501610c2e565b91505092915050565b610d6581610fad565b82525050565b6000610d7682610ef5565b610d808185610f00565b9350610d90818560208601610ff0565b610d99816110b3565b840191505092915050565b6000610db1601d83610f00565b91507f45524332303a20696e73756666696369656e742d616c6c6f77616e63650000006000830152602082019050919050565b6000610df1601b83610f00565b91507f45524332303a20696e73756666696369656e742d62616c616e636500000000006000830152602082019050919050565b610e2d81610fd9565b82525050565b610e3c81610fe3565b82525050565b6000602082019050610e576000830184610d5c565b92915050565b60006020820190508181036000830152610e778184610d6b565b905092915050565b60006020820190508181036000830152610e9881610da4565b9050919050565b60006020820190508181036000830152610eb881610de4565b9050919050565b6000602082019050610ed46000830184610e24565b92915050565b6000602082019050610eef6000830184610e33565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f1c82610fd9565b9150610f2783610fd9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f5c57610f5b611055565b5b828201905092915050565b6000610f7282610fd9565b9150610f7d83610fd9565b925082821015610f9057610f8f611055565b5b828203905092915050565b6000610fa682610fb9565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561100e578082015181840152602081019050610ff3565b8381111561101d576000848401525b50505050565b6000600282049050600182168061103b57607f821691505b6020821081141561104f5761104e611084565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b6110cd81610f9b565b81146110d857600080fd5b50565b6110e481610fd9565b81146110ef57600080fd5b5056fea2646970667358221220e525be46b1cc3d71859b456c84db2eea3546046588e3630369c0107b00a84c8164736f6c63430008000033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): LUSDInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): LUSD;
}
type USDCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class USDC__factory extends ContractFactory {
  constructor(...args: USDCConstructorParams);
  deploy(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<USDC>;
  getDeployTransaction(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): USDC;
  connect(signer: Signer): USDC__factory;
  static readonly bytecode =
    "0x6101606040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610140908152503480156200003a57600080fd5b5060405162002b6b38038062002b6b8339818101604052810190620000609190620004dd565b6040518060400160405280600881526020017f55534420436f696e000000000000000000000000000000000000000000000000815250806040518060400160405280600181526020017f31000000000000000000000000000000000000000000000000000000000000008152506040518060400160405280600881526020017f55534420436f696e0000000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f555344430000000000000000000000000000000000000000000000000000000081525081600390805190602001906200015192919062000416565b5080600490805190602001906200016a92919062000416565b50505060008280519060200120905060008280519060200120905060007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f90508260e081815250508161010081815250504660a08181525050620001d68184846200024160201b60201c565b608081815250503073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508061012081815250505050505050506200023a8164e8d4a510006200027d60201b60201c565b506200077e565b600083838346306040516020016200025e9594939291906200057e565b6040516020818303038152906040528051906020012090509392505050565b6200028f82826200029360201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000306576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002fd90620005db565b60405180910390fd5b6200031a600083836200040c60201b60201c565b80600260008282546200032e91906200062b565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200038591906200062b565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003ec9190620005fd565b60405180910390a362000408600083836200041160201b60201c565b5050565b505050565b505050565b8280546200042490620006d0565b90600052602060002090601f01602090048101928262000448576000855562000494565b82601f106200046357805160ff191683800117855562000494565b8280016001018555821562000494579182015b828111156200049357825182559160200191906001019062000476565b5b509050620004a39190620004a7565b5090565b5b80821115620004c2576000816000905550600101620004a8565b5090565b600081519050620004d78162000764565b92915050565b600060208284031215620004f057600080fd5b60006200050084828501620004c6565b91505092915050565b620005148162000688565b82525050565b62000525816200069c565b82525050565b60006200053a601f836200061a565b91507f45524332303a206d696e7420746f20746865207a65726f2061646472657373006000830152602082019050919050565b6200057881620006c6565b82525050565b600060a0820190506200059560008301886200051a565b620005a460208301876200051a565b620005b360408301866200051a565b620005c260608301856200056d565b620005d1608083018462000509565b9695505050505050565b60006020820190508181036000830152620005f6816200052b565b9050919050565b60006020820190506200061460008301846200056d565b92915050565b600082825260208201905092915050565b60006200063882620006c6565b91506200064583620006c6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156200067d576200067c62000706565b5b828201905092915050565b60006200069582620006a6565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006002820490506001821680620006e957607f821691505b602082108114156200070057620006ff62000735565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6200076f8162000688565b81146200077b57600080fd5b50565b60805160a05160c05160601c60e05161010051610120516101405161238f620007dc600039600061084601526000610eca01526000610f0c01526000610eeb01526000610e2001526000610e7601526000610e9f015261238f6000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806340c10f1911610097578063a457c2d711610066578063a457c2d71461029c578063a9059cbb146102cc578063d505accf146102fc578063dd62ed3e14610318576100f5565b806340c10f191461020257806370a082311461021e5780637ecebe001461024e57806395d89b411461027e576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce567146101965780633644e515146101b457806339509351146101d2576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610348565b60405161010f9190611f2b565b60405180910390f35b610132600480360381019061012d91906117d8565b6103da565b60405161013f9190611dfc565b60405180910390f35b6101506103f8565b60405161015d919061210d565b60405180910390f35b610180600480360381019061017b91906116eb565b610402565b60405161018d9190611dfc565b60405180910390f35b61019e6104fa565b6040516101ab9190612128565b60405180910390f35b6101bc610503565b6040516101c99190611e17565b60405180910390f35b6101ec60048036038101906101e791906117d8565b610512565b6040516101f99190611dfc565b60405180910390f35b61021c600480360381019061021791906117d8565b6105be565b005b61023860048036038101906102339190611686565b6105cc565b604051610245919061210d565b60405180910390f35b61026860048036038101906102639190611686565b610614565b604051610275919061210d565b60405180910390f35b610286610664565b6040516102939190611f2b565b60405180910390f35b6102b660048036038101906102b191906117d8565b6106f6565b6040516102c39190611dfc565b60405180910390f35b6102e660048036038101906102e191906117d8565b6107e1565b6040516102f39190611dfc565b60405180910390f35b6103166004803603810190610311919061173a565b6107ff565b005b610332600480360381019061032d91906116af565b610941565b60405161033f919061210d565b60405180910390f35b60606003805461035790612252565b80601f016020809104026020016040519081016040528092919081815260200182805461038390612252565b80156103d05780601f106103a5576101008083540402835291602001916103d0565b820191906000526020600020905b8154815290600101906020018083116103b357829003601f168201915b5050505050905090565b60006103ee6103e76109c8565b84846109d0565b6001905092915050565b6000600254905090565b600061040f848484610b9b565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600061045a6109c8565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156104da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d19061206d565b60405180910390fd5b6104ee856104e66109c8565b8584036109d0565b60019150509392505050565b60006006905090565b600061050d610e1c565b905090565b60006105b461051f6109c8565b84846001600061052d6109c8565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105af919061216a565b6109d0565b6001905092915050565b6105c88282610f36565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600061065d600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611096565b9050919050565b60606004805461067390612252565b80601f016020809104026020016040519081016040528092919081815260200182805461069f90612252565b80156106ec5780601f106106c1576101008083540402835291602001916106ec565b820191906000526020600020905b8154815290600101906020018083116106cf57829003601f168201915b5050505050905090565b600080600160006107056109c8565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156107c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b9906120cd565b60405180910390fd5b6107d66107cd6109c8565b858584036109d0565b600191505092915050565b60006107f56107ee6109c8565b8484610b9b565b6001905092915050565b83421115610842576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083990611fcd565b60405180910390fd5b60007f00000000000000000000000000000000000000000000000000000000000000008888886108718c6110a4565b8960405160200161088796959493929190611e32565b60405160208183030381529060405280519060200120905060006108aa82611102565b905060006108ba8287878761111c565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461092a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109219061204d565b60405180910390fd5b6109358a8a8a6109d0565b50505050505050505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a37906120ad565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ab0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa790611fad565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610b8e919061210d565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c029061208d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7290611f6d565b60405180910390fd5b610c86838383611147565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0390611fed565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d9f919061216a565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e03919061210d565b60405180910390a3610e1684848461114c565b50505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148015610e9857507f000000000000000000000000000000000000000000000000000000000000000046145b15610ec5577f00000000000000000000000000000000000000000000000000000000000000009050610f33565b610f307f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000611151565b90505b90565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610fa6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9d906120ed565b60405180910390fd5b610fb260008383611147565b8060026000828254610fc4919061216a565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611019919061216a565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161107e919061210d565b60405180910390a36110926000838361114c565b5050565b600081600001549050919050565b600080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506110f181611096565b91506110fc8161118b565b50919050565b600061111561110f610e1c565b836111a1565b9050919050565b600080600061112d878787876111d4565b9150915061113a816112e1565b8192505050949350505050565b505050565b505050565b6000838383463060405160200161116c959493929190611e93565b6040516020818303038152906040528051906020012090509392505050565b6001816000016000828254019250508190555050565b600082826040516020016111b6929190611dc5565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c111561120f5760006003915091506112d8565b601b8560ff16141580156112275750601c8560ff1614155b156112395760006004915091506112d8565b60006001878787876040516000815260200160405260405161125e9493929190611ee6565b6020604051602081039080840390855afa158015611280573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156112cf576000600192509250506112d8565b80600092509250505b94509492505050565b6000600481111561131b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b816004811115611354577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561135f5761162f565b60016004811115611399577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160048111156113d2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415611413576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161140a90611f4d565b60405180910390fd5b6002600481111561144d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b816004811115611486577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14156114c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114be90611f8d565b60405180910390fd5b60036004811115611501577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b81600481111561153a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561157b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115729061200d565b60405180910390fd5b6004808111156115b4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160048111156115ed577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561162e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116259061202d565b60405180910390fd5b5b50565b600081359050611641816122fd565b92915050565b60008135905061165681612314565b92915050565b60008135905061166b8161232b565b92915050565b60008135905061168081612342565b92915050565b60006020828403121561169857600080fd5b60006116a684828501611632565b91505092915050565b600080604083850312156116c257600080fd5b60006116d085828601611632565b92505060206116e185828601611632565b9150509250929050565b60008060006060848603121561170057600080fd5b600061170e86828701611632565b935050602061171f86828701611632565b92505060406117308682870161165c565b9150509250925092565b600080600080600080600060e0888a03121561175557600080fd5b60006117638a828b01611632565b97505060206117748a828b01611632565b96505060406117858a828b0161165c565b95505060606117968a828b0161165c565b94505060806117a78a828b01611671565b93505060a06117b88a828b01611647565b92505060c06117c98a828b01611647565b91505092959891949750929550565b600080604083850312156117eb57600080fd5b60006117f985828601611632565b925050602061180a8582860161165c565b9150509250929050565b61181d816121c0565b82525050565b61182c816121d2565b82525050565b61183b816121de565b82525050565b61185261184d826121de565b612284565b82525050565b600061186382612143565b61186d818561214e565b935061187d81856020860161221f565b611886816122ec565b840191505092915050565b600061189e60188361214e565b91507f45434453413a20696e76616c6964207369676e617475726500000000000000006000830152602082019050919050565b60006118de60238361214e565b91507f45524332303a207472616e7366657220746f20746865207a65726f206164647260008301527f65737300000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611944601f8361214e565b91507f45434453413a20696e76616c6964207369676e6174757265206c656e677468006000830152602082019050919050565b600061198460228361214e565b91507f45524332303a20617070726f766520746f20746865207a65726f20616464726560008301527f73730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006119ea60028361215f565b91507f19010000000000000000000000000000000000000000000000000000000000006000830152600282019050919050565b6000611a2a601d8361214e565b91507f45524332305065726d69743a206578706972656420646561646c696e650000006000830152602082019050919050565b6000611a6a60268361214e565b91507f45524332303a207472616e7366657220616d6f756e742065786365656473206260008301527f616c616e636500000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611ad060228361214e565b91507f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008301527f75650000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611b3660228361214e565b91507f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008301527f75650000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611b9c601e8361214e565b91507f45524332305065726d69743a20696e76616c6964207369676e617475726500006000830152602082019050919050565b6000611bdc60288361214e565b91507f45524332303a207472616e7366657220616d6f756e742065786365656473206160008301527f6c6c6f77616e63650000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611c4260258361214e565b91507f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008301527f64726573730000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611ca860248361214e565b91507f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611d0e60258361214e565b91507f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008301527f207a65726f0000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000611d74601f8361214e565b91507f45524332303a206d696e7420746f20746865207a65726f2061646472657373006000830152602082019050919050565b611db081612208565b82525050565b611dbf81612212565b82525050565b6000611dd0826119dd565b9150611ddc8285611841565b602082019150611dec8284611841565b6020820191508190509392505050565b6000602082019050611e116000830184611823565b92915050565b6000602082019050611e2c6000830184611832565b92915050565b600060c082019050611e476000830189611832565b611e546020830188611814565b611e616040830187611814565b611e6e6060830186611da7565b611e7b6080830185611da7565b611e8860a0830184611da7565b979650505050505050565b600060a082019050611ea86000830188611832565b611eb56020830187611832565b611ec26040830186611832565b611ecf6060830185611da7565b611edc6080830184611814565b9695505050505050565b6000608082019050611efb6000830187611832565b611f086020830186611db6565b611f156040830185611832565b611f226060830184611832565b95945050505050565b60006020820190508181036000830152611f458184611858565b905092915050565b60006020820190508181036000830152611f6681611891565b9050919050565b60006020820190508181036000830152611f86816118d1565b9050919050565b60006020820190508181036000830152611fa681611937565b9050919050565b60006020820190508181036000830152611fc681611977565b9050919050565b60006020820190508181036000830152611fe681611a1d565b9050919050565b6000602082019050818103600083015261200681611a5d565b9050919050565b6000602082019050818103600083015261202681611ac3565b9050919050565b6000602082019050818103600083015261204681611b29565b9050919050565b6000602082019050818103600083015261206681611b8f565b9050919050565b6000602082019050818103600083015261208681611bcf565b9050919050565b600060208201905081810360008301526120a681611c35565b9050919050565b600060208201905081810360008301526120c681611c9b565b9050919050565b600060208201905081810360008301526120e681611d01565b9050919050565b6000602082019050818103600083015261210681611d67565b9050919050565b60006020820190506121226000830184611da7565b92915050565b600060208201905061213d6000830184611db6565b92915050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b600061217582612208565b915061218083612208565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156121b5576121b461228e565b5b828201905092915050565b60006121cb826121e8565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561223d578082015181840152602081019050612222565b8381111561224c576000848401525b50505050565b6000600282049050600182168061226a57607f821691505b6020821081141561227e5761227d6122bd565b5b50919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b612306816121c0565b811461231157600080fd5b50565b61231d816121de565b811461232857600080fd5b50565b61233481612208565b811461233f57600080fd5b50565b61234b81612212565b811461235657600080fd5b5056fea2646970667358221220a26facf77f86f6c26bf554046a424bb2cebce2ac7cc7a1e713e0cdd332df3be764736f6c63430008000033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): USDCInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): USDC;
}
type BasicTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class BasicToken__factory extends ContractFactory {
  constructor(...args: BasicTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<BasicToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): BasicToken;
  connect(signer: Signer): BasicToken__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b50610416806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461005c57806370a0823114610087578063a9059cbb146100de575b600080fd5b34801561006857600080fd5b50610071610143565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100c8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061014d565b6040518082815260200191505060405180910390f35b3480156100ea57600080fd5b50610129600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610195565b604051808215151515815260200191505060405180910390f35b6000600154905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156101e457600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561022057600080fd5b610271826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546103b590919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610304826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546103ce90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60008282111515156103c357fe5b818303905092915050565b600081830190508281101515156103e157fe5b809050929150505600a165627a7a723058201abb33b4101a475f783f857ffab7c2ed728c1750e96fe7cef1e901e6eef908770029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): BasicTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BasicToken;
}
type BurnableTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class BurnableToken__factory extends ContractFactory {
  constructor(...args: BurnableTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<BurnableToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): BurnableToken;
  connect(signer: Signer): BurnableToken__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5061060e806100206000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461006757806342966c681461009257806370a08231146100bf578063a9059cbb14610116575b600080fd5b34801561007357600080fd5b5061007c61017b565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100bd60048036038101908080359060200190929190505050610185565b005b3480156100cb57600080fd5b50610100600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610192565b6040518082815260200191505060405180910390f35b34801561012257600080fd5b50610161600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101da565b604051808215151515815260200191505060405180910390f35b6000600154905090565b61018f33826103fa565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561022957600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561026557600080fd5b6102b6826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105ad90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610349826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105c690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115151561044757600080fd5b610498816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105ad90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506104ef816001546105ad90919063ffffffff16565b6001819055508173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b60008282111515156105bb57fe5b818303905092915050565b600081830190508281101515156105d957fe5b809050929150505600a165627a7a72305820e4c5578e9bd2f427e691f81722d0c599d10492990d53191f56d627e516474cb50029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): BurnableTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BurnableToken;
}
type CanReclaimTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class CanReclaimToken__factory extends ContractFactory {
  constructor(...args: CanReclaimTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<CanReclaimToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): CanReclaimToken;
  connect(signer: Signer): CanReclaimToken__factory;
  static readonly bytecode =
    "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610682806100536000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317ffc32014610067578063715018a6146100aa5780638da5cb5b146100c1578063f2fde38b14610118575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061015b565b005b3480156100b657600080fd5b506100bf6102e0565b005b3480156100cd57600080fd5b506100d66103e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012457600080fd5b50610159600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610407565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101b857600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d602081101561027d57600080fd5b810190808051906020019092919050505090506102dc6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828473ffffffffffffffffffffffffffffffffffffffff1661046e9092919063ffffffff16565b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561033b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561046257600080fd5b61046b8161055c565b50565b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561051157600080fd5b505af1158015610525573d6000803e3d6000fd5b505050506040513d602081101561053b57600080fd5b8101908080519060200190929190505050151561055757600080fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561059857600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582035373118b9c8dae911f9ae9b405ebd7ab5a4218aa8263c9d68affd29fbd21d4d0029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): CanReclaimTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CanReclaimToken;
}
type ClaimableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class Claimable__factory extends ContractFactory {
  constructor(...args: ClaimableConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<Claimable>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): Claimable;
  connect(signer: Signer): Claimable__factory;
  static readonly bytecode =
    "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610548806100536000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634e71e0c814610072578063715018a6146100895780638da5cb5b146100a0578063e30c3978146100f7578063f2fde38b1461014e575b600080fd5b34801561007e57600080fd5b50610087610191565b005b34801561009557600080fd5b5061009e610330565b005b3480156100ac57600080fd5b506100b5610432565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561010357600080fd5b5061010c610457565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561015a57600080fd5b5061018f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061047d565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101ed57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561038b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d857600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582044303438f91f4508b41c107e0c4c3e79b965bee0aad4c764812fce883d0df9fd0029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): ClaimableInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): Claimable;
}
export class DetailedERC20__factory {
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        inputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): DetailedERC20Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): DetailedERC20;
}
export class ERC20Basic__factory {
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): ERC20BasicInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ERC20Basic;
}
type MintableTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class MintableToken__factory extends ContractFactory {
  constructor(...args: MintableTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<MintableToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): MintableToken;
  connect(signer: Signer): MintableToken__factory;
  static readonly bytecode =
    "0x60806040526000600360146101000a81548160ff02191690831515021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506117408061006f6000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b146100d5578063095ea7b31461010457806318160ddd1461016957806323b872dd1461019457806340c10f1914610219578063661884631461027e57806370a08231146102e3578063715018a61461033a5780637d64bcb4146103515780638da5cb5b14610380578063a9059cbb146103d7578063d73dd6231461043c578063dd62ed3e146104a1578063f2fde38b14610518575b600080fd5b3480156100e157600080fd5b506100ea61055b565b604051808215151515815260200191505060405180910390f35b34801561011057600080fd5b5061014f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061056e565b604051808215151515815260200191505060405180910390f35b34801561017557600080fd5b5061017e610660565b6040518082815260200191505060405180910390f35b3480156101a057600080fd5b506101ff600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061066a565b604051808215151515815260200191505060405180910390f35b34801561022557600080fd5b50610264600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a25565b604051808215151515815260200191505060405180910390f35b34801561028a57600080fd5b506102c9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610c0b565b604051808215151515815260200191505060405180910390f35b3480156102ef57600080fd5b50610324600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e9d565b6040518082815260200191505060405180910390f35b34801561034657600080fd5b5061034f610ee5565b005b34801561035d57600080fd5b50610366610fea565b604051808215151515815260200191505060405180910390f35b34801561038c57600080fd5b506103956110b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103e357600080fd5b50610422600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d8565b604051808215151515815260200191505060405180910390f35b34801561044857600080fd5b50610487600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506112f8565b604051808215151515815260200191505060405180910390f35b3480156104ad57600080fd5b50610502600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114f4565b6040518082815260200191505060405180910390f35b34801561052457600080fd5b50610559600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061157b565b005b600360149054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156106b957600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561074457600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561078057600080fd5b6107d1826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e390919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610864826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115fc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061093582600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e390919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a8357600080fd5b600360149054906101000a900460ff16151515610a9f57600080fd5b610ab4826001546115fc90919063ffffffff16565b600181905550610b0b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115fc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610d1d576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610db1565b610d3083826115e390919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f4157600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561104857600080fd5b600360149054906101000a900460ff1615151561106457600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561112757600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561116357600080fd5b6111b4826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115e390919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611247826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115fc90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061138982600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546115fc90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115d757600080fd5b6115e081611618565b50565b60008282111515156115f157fe5b818303905092915050565b6000818301905082811015151561160f57fe5b80905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561165457600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582051ade0bfed1139974f85a9de3dbc42933745b19590b39f9d36978ad764a37ce10029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): MintableTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MintableToken;
}
type OwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class Ownable__factory extends ContractFactory {
  constructor(...args: OwnableConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<Ownable>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): Ownable;
  connect(signer: Signer): Ownable__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103c1806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063715018a61461005c5780638da5cb5b14610073578063f2fde38b146100ca575b600080fd5b34801561006857600080fd5b5061007161010d565b005b34801561007f57600080fd5b5061008861020f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100d657600080fd5b5061010b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610234565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561016857600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561028f57600080fd5b6102988161029b565b50565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156102d757600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582063eb8c8c1aca818bb8687f0a8be9aef19b54a315529c5a6ca1d73a7321fecf6b0029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        inputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): OwnableInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): Ownable;
}
type OwnableContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class OwnableContract__factory extends ContractFactory {
  constructor(...args: OwnableContractConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<OwnableContract>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): OwnableContract;
  connect(signer: Signer): OwnableContract__factory;
  static readonly bytecode =
    "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610809806100536000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317ffc3201461007d5780634e71e0c8146100c0578063715018a6146100d75780638da5cb5b146100ee578063e30c397814610145578063f2fde38b1461019c575b600080fd5b34801561008957600080fd5b506100be600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101df565b005b3480156100cc57600080fd5b506100d5610364565b005b3480156100e357600080fd5b506100ec610503565b005b3480156100fa57600080fd5b50610103610605565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561015157600080fd5b5061015a61062a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a857600080fd5b506101dd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610650565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561023c57600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1580156102d757600080fd5b505af11580156102eb573d6000803e3d6000fd5b505050506040513d602081101561030157600080fd5b810190808051906020019092919050505090506103606000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828473ffffffffffffffffffffffffffffffffffffffff166106ef9092919063ffffffff16565b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103c057600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055e57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106ab57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561079257600080fd5b505af11580156107a6573d6000803e3d6000fd5b505050506040513d60208110156107bc57600080fd5b810190808051906020019092919050505015156107d857600080fd5b5050505600a165627a7a72305820237519ca65eed0890b7e8b8867d53cd8af30e94fe26542e89a5b8d96f786e32d0029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): OwnableContractInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): OwnableContract;
}
type PausableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class Pausable__factory extends ContractFactory {
  constructor(...args: PausableConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<Pausable>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): Pausable;
  connect(signer: Signer): Pausable__factory;
  static readonly bytecode =
    "0x608060405260008060146101000a81548160ff021916908315150217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105d08061006d6000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633f4ba83a1461007d5780635c975abb14610094578063715018a6146100c35780638456cb59146100da5780638da5cb5b146100f1578063f2fde38b14610148575b600080fd5b34801561008957600080fd5b5061009261018b565b005b3480156100a057600080fd5b506100a9610249565b604051808215151515815260200191505060405180910390f35b3480156100cf57600080fd5b506100d861025c565b005b3480156100e657600080fd5b506100ef61035e565b005b3480156100fd57600080fd5b5061010661041e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561015457600080fd5b50610189600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610443565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101e657600080fd5b600060149054906101000a900460ff16151561020157600080fd5b60008060146101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b600060149054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102b757600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103b957600080fd5b600060149054906101000a900460ff161515156103d557600080fd5b6001600060146101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561049e57600080fd5b6104a7816104aa565b50565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156104e657600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058206b07f84a552638e81c0b5358bb6511d9361887dc008d792b182218b77f0d15f00029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): PausableInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): Pausable;
}
type PausableTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class PausableToken__factory extends ContractFactory {
  constructor(...args: PausableTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<PausableToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): PausableToken;
  connect(signer: Signer): PausableToken__factory;
  static readonly bytecode =
    "0x60806040526000600360146101000a81548160ff02191690831515021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061169f8061006f6000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b3146100d557806318160ddd1461013a57806323b872dd146101655780633f4ba83a146101ea5780635c975abb14610201578063661884631461023057806370a0823114610295578063715018a6146102ec5780638456cb59146103035780638da5cb5b1461031a578063a9059cbb14610371578063d73dd623146103d6578063dd62ed3e1461043b578063f2fde38b146104b2575b600080fd5b3480156100e157600080fd5b50610120600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104f5565b604051808215151515815260200191505060405180910390f35b34801561014657600080fd5b5061014f610525565b6040518082815260200191505060405180910390f35b34801561017157600080fd5b506101d0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061052f565b604051808215151515815260200191505060405180910390f35b3480156101f657600080fd5b506101ff610561565b005b34801561020d57600080fd5b50610216610621565b604051808215151515815260200191505060405180910390f35b34801561023c57600080fd5b5061027b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610634565b604051808215151515815260200191505060405180910390f35b3480156102a157600080fd5b506102d6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610664565b6040518082815260200191505060405180910390f35b3480156102f857600080fd5b506103016106ac565b005b34801561030f57600080fd5b506103186107b1565b005b34801561032657600080fd5b5061032f610872565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561037d57600080fd5b506103bc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610898565b604051808215151515815260200191505060405180910390f35b3480156103e257600080fd5b50610421600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108c8565b604051808215151515815260200191505060405180910390f35b34801561044757600080fd5b5061049c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108f8565b6040518082815260200191505060405180910390f35b3480156104be57600080fd5b506104f3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061097f565b005b6000600360149054906101000a900460ff1615151561051357600080fd5b61051d83836109e7565b905092915050565b6000600154905090565b6000600360149054906101000a900460ff1615151561054d57600080fd5b610558848484610ad9565b90509392505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105bd57600080fd5b600360149054906101000a900460ff1615156105d857600080fd5b6000600360146101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b600360149054906101000a900460ff1681565b6000600360149054906101000a900460ff1615151561065257600080fd5b61065c8383610e94565b905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561070857600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561080d57600080fd5b600360149054906101000a900460ff1615151561082957600080fd5b6001600360146101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360149054906101000a900460ff161515156108b657600080fd5b6108c08383611126565b905092915050565b6000600360149054906101000a900460ff161515156108e657600080fd5b6108f08383611346565b905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156109db57600080fd5b6109e481611542565b50565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610b2857600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610bb357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610bef57600080fd5b610c40826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461163e90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cd3826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461165790919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610da482600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461163e90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610fa6576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061103a565b610fb9838261163e90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561117557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156111b157600080fd5b611202826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461163e90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611295826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461165790919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60006113d782600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461165790919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561157e57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600082821115151561164c57fe5b818303905092915050565b6000818301905082811015151561166a57fe5b809050929150505600a165627a7a723058206bcaaf8553ebb7ff390f3063eae0470f43e20a6c130be03a58b814f2ad51e4820029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): PausableTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): PausableToken;
}
type StandardTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class StandardToken__factory extends ContractFactory {
  constructor(...args: StandardTokenConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<StandardToken>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): StandardToken;
  connect(signer: Signer): StandardToken__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5061103a806100206000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b31461009357806318160ddd146100f857806323b872dd1461012357806366188463146101a857806370a082311461020d578063a9059cbb14610264578063d73dd623146102c9578063dd62ed3e1461032e575b600080fd5b34801561009f57600080fd5b506100de600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103a5565b604051808215151515815260200191505060405180910390f35b34801561010457600080fd5b5061010d610497565b6040518082815260200191505060405180910390f35b34801561012f57600080fd5b5061018e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104a1565b604051808215151515815260200191505060405180910390f35b3480156101b457600080fd5b506101f3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061085c565b604051808215151515815260200191505060405180910390f35b34801561021957600080fd5b5061024e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610aee565b6040518082815260200191505060405180910390f35b34801561027057600080fd5b506102af600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b36565b604051808215151515815260200191505060405180910390f35b3480156102d557600080fd5b50610314600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d56565b604051808215151515815260200191505060405180910390f35b34801561033a57600080fd5b5061038f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f52565b6040518082815260200191505060405180910390f35b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156104f057600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561057b57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156105b757600080fd5b610608826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fd990919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061069b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ff290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061076c82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fd990919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050808310151561096e576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a02565b6109818382610fd990919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610b8557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610bc157600080fd5b610c12826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fd990919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610ca5826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ff290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000610de782600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ff290919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000828211151515610fe757fe5b818303905092915050565b6000818301905082811015151561100557fe5b809050929150505600a165627a7a723058200cd1c99c286e22d252f79e7174eccb8c6f26c6a4ae0a068b32011b7cc8a74b940029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): StandardTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): StandardToken;
}
type WBTCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class WBTC__factory extends ContractFactory {
  constructor(...args: WBTCConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<WBTC>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): WBTC;
  connect(signer: Signer): WBTC__factory;
  static readonly bytecode =
    "0x60806040526000600560156101000a81548160ff0219169083151502179055506000600560166101000a81548160ff0219169083151502179055506040805190810160405280600b81526020017f57726170706564204254430000000000000000000000000000000000000000008152506040805190810160405280600481526020017f574254430000000000000000000000000000000000000000000000000000000081525060088260039080519060200190620000c09291906200013f565b508160049080519060200190620000d99291906200013f565b5080600560006101000a81548160ff021916908360ff16021790555050505033600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001ee565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200018257805160ff1916838001178555620001b3565b82800160010185558215620001b3579182015b82811115620001b257825182559160200191906001019062000195565b5b509050620001c29190620001c6565b5090565b620001eb91905b80821115620001e7576000816000905550600101620001cd565b5090565b90565b61231180620001fe6000396000f30060806040526004361061013e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b1461014357806306fdde0314610172578063095ea7b31461020257806317ffc3201461026757806318160ddd146102aa57806323b872dd146102d5578063313ce5671461035a5780633f4ba83a1461038b57806340c10f19146103a257806342966c68146104075780634e71e0c8146104345780635c975abb1461044b578063661884631461047a57806370a08231146104df578063715018a6146105365780637d64bcb41461054d5780638456cb591461057c5780638da5cb5b1461059357806395d89b41146105ea578063a9059cbb1461067a578063d73dd623146106df578063dd62ed3e14610744578063e30c3978146107bb578063f2fde38b14610812575b600080fd5b34801561014f57600080fd5b50610158610855565b604051808215151515815260200191505060405180910390f35b34801561017e57600080fd5b50610187610868565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101c75780820151818401526020810190506101ac565b50505050905090810190601f1680156101f45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561020e57600080fd5b5061024d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610906565b604051808215151515815260200191505060405180910390f35b34801561027357600080fd5b506102a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610936565b005b3480156102b657600080fd5b506102bf610abd565b6040518082815260200191505060405180910390f35b3480156102e157600080fd5b50610340600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ac7565b604051808215151515815260200191505060405180910390f35b34801561036657600080fd5b5061036f610af9565b604051808260ff1660ff16815260200191505060405180910390f35b34801561039757600080fd5b506103a0610b0c565b005b3480156103ae57600080fd5b506103ed600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bcc565b604051808215151515815260200191505060405180910390f35b34801561041357600080fd5b5061043260048036038101908080359060200190929190505050610db2565b005b34801561044057600080fd5b50610449610e1a565b005b34801561045757600080fd5b50610460610fbb565b604051808215151515815260200191505060405180910390f35b34801561048657600080fd5b506104c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fce565b604051808215151515815260200191505060405180910390f35b3480156104eb57600080fd5b50610520600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ffe565b6040518082815260200191505060405180910390f35b34801561054257600080fd5b5061054b611046565b005b34801561055957600080fd5b50610562611110565b604051808215151515815260200191505060405180910390f35b34801561058857600080fd5b50610591611175565b005b34801561059f57600080fd5b506105a8611236565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105f657600080fd5b506105ff61125c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561063f578082015181840152602081019050610624565b50505050905090810190601f16801561066c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561068657600080fd5b506106c5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506112fa565b604051808215151515815260200191505060405180910390f35b3480156106eb57600080fd5b5061072a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061132a565b604051808215151515815260200191505060405180910390f35b34801561075057600080fd5b506107a5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061135a565b6040518082815260200191505060405180910390f35b3480156107c757600080fd5b506107d06113e1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561081e57600080fd5b50610853600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611407565b005b600560159054906101000a900460ff1681565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108fe5780601f106108d3576101008083540402835291602001916108fe565b820191906000526020600020905b8154815290600101906020018083116108e157829003601f168201915b505050505081565b6000600560169054906101000a900460ff1615151561092457600080fd5b61092e83836114a7565b905092915050565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561099457600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015610a2f57600080fd5b505af1158015610a43573d6000803e3d6000fd5b505050506040513d6020811015610a5957600080fd5b81019080805190602001909291905050509050610ab9600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828473ffffffffffffffffffffffffffffffffffffffff166115999092919063ffffffff16565b5050565b6000600154905090565b6000600560169054906101000a900460ff16151515610ae557600080fd5b610af0848484611687565b90509392505050565b600560009054906101000a900460ff1681565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b6857600080fd5b600560169054906101000a900460ff161515610b8357600080fd5b6000600560166101000a81548160ff0219169083151502179055507f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3360405160405180910390a1565b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c2a57600080fd5b600560159054906101000a900460ff16151515610c4657600080fd5b610c5b82600154611a4290919063ffffffff16565b600181905550610cb2826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a4290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e0e57600080fd5b610e1781611a5e565b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e7657600080fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600560016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600560169054906101000a900460ff1681565b6000600560169054906101000a900460ff16151515610fec57600080fd5b610ff68383611a6b565b905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110a257600080fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f72656e6f756e63696e67206f776e65727368697020697320626c6f636b65640081525060200191505060405180910390fd5b6000600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561116e57600080fd5b6000905090565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156111d157600080fd5b600560169054906101000a900460ff161515156111ed57600080fd5b6001600560166101000a81548160ff0219169083151502179055507f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62560405160405180910390a1565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112f25780601f106112c7576101008083540402835291602001916112f2565b820191906000526020600020905b8154815290600101906020018083116112d557829003601f168201915b505050505081565b6000600560169054906101000a900460ff1615151561131857600080fd5b6113228383611cfd565b905092915050565b6000600560169054906101000a900460ff1615151561134857600080fd5b6113528383611f1d565b905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561146357600080fd5b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561163c57600080fd5b505af1158015611650573d6000803e3d6000fd5b505050506040513d602081101561166657600080fd5b8101908080519060200190929190505050151561168257600080fd5b505050565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156116d657600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561176157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561179d57600080fd5b6117ee826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461211990919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611881826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a4290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061195282600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461211990919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60008183019050828110151515611a5557fe5b80905092915050565b611a683382612132565b50565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515611b7d576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611c11565b611b90838261211990919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515611d4c57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515611d8857600080fd5b611dd9826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461211990919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611e6c826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a4290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000611fae82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611a4290919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b600082821115151561212757fe5b818303905092915050565b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054811115151561217f57600080fd5b6121d0816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461211990919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506122278160015461211990919063ffffffff16565b6001819055508173ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5826040518082815260200191505060405180910390a2600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a350505600a165627a7a72305820c1f6c6dd7911e63f39e719af471060cd99190ede6a004560c348b5a0bb0f96d50029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): WBTCInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): WBTC;
}
type WETHConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export class WETH__factory extends ContractFactory {
  constructor(...args: WETHConstructorParams);
  deploy(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<WETH>;
  getDeployTransaction(
    sender: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): WETH;
  connect(signer: Signer): WETH__factory;
  static readonly bytecode =
    "0x60806040523480156200001157600080fd5b50604051620016df380380620016df833981810160405281019062000037919062000404565b6040518060400160405280600d81526020017f57726170706564204574686572000000000000000000000000000000000000008152506040518060400160405280600481526020017f57455448000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000bb9291906200033d565b508060019080519060200190620000d49291906200033d565b506012600260006101000a81548160ff021916908360ff1602179055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460003073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050620001cd6012620001f760201b60201c565b620001f0817002f050fe938943acc45f655680000000006200021560201b60201c565b50620005a7565b80600260006101000a81548160ff021916908360ff16021790555050565b6200022782826200022b60201b60201c565b5050565b806003546200023b91906200045e565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200028e91906200045e565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000331919062000441565b60405180910390a35050565b8280546200034b90620004f9565b90600052602060002090601f0160209004810192826200036f5760008555620003bb565b82601f106200038a57805160ff1916838001178555620003bb565b82800160010185558215620003bb579182015b82811115620003ba5782518255916020019190600101906200039d565b5b509050620003ca9190620003ce565b5090565b5b80821115620003e9576000816000905550600101620003cf565b5090565b600081519050620003fe816200058d565b92915050565b6000602082840312156200041757600080fd5b60006200042784828501620003ed565b91505092915050565b6200043b81620004ef565b82525050565b600060208201905062000458600083018462000430565b92915050565b60006200046b82620004ef565b91506200047883620004ef565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620004b057620004af6200052f565b5b828201905092915050565b6000620004c882620004cf565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060028204905060018216806200051257607f821691505b602082108114156200052957620005286200055e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6200059881620004bb565b8114620005a457600080fd5b50565b61112880620005b76000396000f3fe6080604052600436106100a75760003560e01c806340c10f191161006457806340c10f19146101d057806370a08231146101f957806395d89b4114610236578063a9059cbb14610261578063d0e30db01461029e578063dd62ed3e146102a8576100a7565b806306fdde03146100ac578063095ea7b3146100d757806318160ddd1461011457806323b872dd1461013f5780632e1a7d4d1461017c578063313ce567146101a5575b600080fd5b3480156100b857600080fd5b506100c16102e5565b6040516100ce9190610e5d565b60405180910390f35b3480156100e357600080fd5b506100fe60048036038101906100f99190610cf7565b610373565b60405161010b9190610e42565b60405180910390f35b34801561012057600080fd5b50610129610465565b6040516101369190610ebf565b60405180910390f35b34801561014b57600080fd5b5061016660048036038101906101619190610ca8565b61046f565b6040516101739190610e42565b60405180910390f35b34801561018857600080fd5b506101a3600480360381019061019e9190610d33565b6107f8565b005b3480156101b157600080fd5b506101ba610861565b6040516101c79190610eda565b60405180910390f35b3480156101dc57600080fd5b506101f760048036038101906101f29190610cf7565b610874565b005b34801561020557600080fd5b50610220600480360381019061021b9190610c43565b610882565b60405161022d9190610ebf565b60405180910390f35b34801561024257600080fd5b5061024b6108cb565b6040516102589190610e5d565b60405180910390f35b34801561026d57600080fd5b5061028860048036038101906102839190610cf7565b610959565b6040516102959190610e42565b60405180910390f35b6102a661096e565b005b3480156102b457600080fd5b506102cf60048036038101906102ca9190610c6c565b61097a565b6040516102dc9190610ebf565b60405180910390f35b600080546102f290611023565b80601f016020809104026020016040519081016040528092919081815260200182805461031e90611023565b801561036b5780601f106103405761010080835404028352916020019161036b565b820191906000526020600020905b81548152906001019060200180831161034e57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104539190610ebf565b60405180910390a36001905092915050565b6000600354905090565b600080600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083821015610578576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056f90610e9f565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156105d457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114155b156106a9578381101561061c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061390610e7f565b60405180910390fd5b83816106289190610f67565b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b83826106b59190610f67565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555083600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107439190610f11565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040516107e39190610ebf565b60405180910390a36001925050509392505050565b8061080233610882565b101561080d57600080fd5b6108173382610a01565b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561085d573d6000803e3d6000fd5b5050565b600260009054906101000a900460ff1681565b61087e8282610b0d565b5050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600180546108d890611023565b80601f016020809104026020016040519081016040528092919081815260200182805461090490611023565b80156109515780601f1061092657610100808354040283529160200191610951565b820191906000526020600020905b81548152906001019060200180831161093457829003601f168201915b505050505081565b600061096633848461046f565b905092915050565b6109783334610b0d565b565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b80600354610a0f9190610f67565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a609190610f67565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b019190610ebf565b60405180910390a35050565b80600354610b1b9190610f11565b60038190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610b6c9190610f11565b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c0d9190610ebf565b60405180910390a35050565b600081359050610c28816110c4565b92915050565b600081359050610c3d816110db565b92915050565b600060208284031215610c5557600080fd5b6000610c6384828501610c19565b91505092915050565b60008060408385031215610c7f57600080fd5b6000610c8d85828601610c19565b9250506020610c9e85828601610c19565b9150509250929050565b600080600060608486031215610cbd57600080fd5b6000610ccb86828701610c19565b9350506020610cdc86828701610c19565b9250506040610ced86828701610c2e565b9150509250925092565b60008060408385031215610d0a57600080fd5b6000610d1885828601610c19565b9250506020610d2985828601610c2e565b9150509250929050565b600060208284031215610d4557600080fd5b6000610d5384828501610c2e565b91505092915050565b610d6581610fad565b82525050565b6000610d7682610ef5565b610d808185610f00565b9350610d90818560208601610ff0565b610d99816110b3565b840191505092915050565b6000610db1601d83610f00565b91507f45524332303a20696e73756666696369656e742d616c6c6f77616e63650000006000830152602082019050919050565b6000610df1601b83610f00565b91507f45524332303a20696e73756666696369656e742d62616c616e636500000000006000830152602082019050919050565b610e2d81610fd9565b82525050565b610e3c81610fe3565b82525050565b6000602082019050610e576000830184610d5c565b92915050565b60006020820190508181036000830152610e778184610d6b565b905092915050565b60006020820190508181036000830152610e9881610da4565b9050919050565b60006020820190508181036000830152610eb881610de4565b9050919050565b6000602082019050610ed46000830184610e24565b92915050565b6000602082019050610eef6000830184610e33565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610f1c82610fd9565b9150610f2783610fd9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f5c57610f5b611055565b5b828201905092915050565b6000610f7282610fd9565b9150610f7d83610fd9565b925082821015610f9057610f8f611055565b5b828203905092915050565b6000610fa682610fb9565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561100e578082015181840152602081019050610ff3565b8381111561101d576000848401525b50505050565b6000600282049050600182168061103b57607f821691505b6020821081141561104f5761104e611084565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b6110cd81610f9b565b81146110d857600080fd5b50565b6110e481610fd9565b81146110ef57600080fd5b5056fea2646970667358221220bf897b31d473ca0c1b7d9277a11bf3bd6c84a35261f6b484465d025b3aee9b9364736f6c63430008000033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): WETHInterface;
  static connect(address: string, signerOrProvider: Signer | Provider): WETH;
}

//# sourceMappingURL=index.d.ts.map
