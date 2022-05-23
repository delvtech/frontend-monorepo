import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface BalanceAllocationMockInterface extends utils.Interface {
  functions: {
    "cash(bytes32)": FunctionFragment;
    "cashToManaged(bytes32,uint256)": FunctionFragment;
    "decreaseCash(bytes32,uint256)": FunctionFragment;
    "fromSharedToBalanceA(bytes32,bytes32)": FunctionFragment;
    "fromSharedToBalanceB(bytes32,bytes32)": FunctionFragment;
    "increaseCash(bytes32,uint256)": FunctionFragment;
    "isNotZero(bytes32)": FunctionFragment;
    "isZero(bytes32)": FunctionFragment;
    "lastChangeBlock(bytes32)": FunctionFragment;
    "managed(bytes32)": FunctionFragment;
    "managedToCash(bytes32,uint256)": FunctionFragment;
    "setManaged(bytes32,uint256)": FunctionFragment;
    "toBalance(uint256,uint256,uint256)": FunctionFragment;
    "toSharedCash(bytes32,bytes32)": FunctionFragment;
    "toSharedManaged(bytes32,bytes32)": FunctionFragment;
    "total(bytes32)": FunctionFragment;
    "totals(bytes32[])": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "cash", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "cashToManaged",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseCash",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "fromSharedToBalanceA",
    values: [BytesLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "fromSharedToBalanceB",
    values: [BytesLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "increaseCash",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "isNotZero",
    values: [BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "isZero", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "lastChangeBlock",
    values: [BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "managed", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "managedToCash",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "setManaged",
    values: [BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "toBalance",
    values: [BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "toSharedCash",
    values: [BytesLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "toSharedManaged",
    values: [BytesLike, BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "total", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "totals", values: [BytesLike[]]): string;
  decodeFunctionResult(functionFragment: "cash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cashToManaged",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseCash",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "fromSharedToBalanceA",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "fromSharedToBalanceB",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseCash",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "isNotZero", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isZero", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastChangeBlock",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "managed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "managedToCash",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "setManaged", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toSharedCash",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "toSharedManaged",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "total", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totals", data: BytesLike): Result;
  events: {};
}
export interface BalanceAllocationMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BalanceAllocationMockInterface;
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
    cash(balance: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
    cashToManaged(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    decreaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    fromSharedToBalanceA(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    fromSharedToBalanceB(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    increaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    isNotZero(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
    isZero(balance: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
    lastChangeBlock(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    managed(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    managedToCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    setManaged(
      balance: BytesLike,
      newManaged: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    toBalance(
      _cash: BigNumberish,
      _managed: BigNumberish,
      _lastChangeBlock: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    toSharedCash(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    toSharedManaged(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    total(balance: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
    totals(
      balances: BytesLike[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        result: BigNumber[];
      }
    >;
  };
  cash(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  cashToManaged(
    balance: BytesLike,
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  decreaseCash(
    balance: BytesLike,
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  fromSharedToBalanceA(
    sharedCash: BytesLike,
    sharedManaged: BytesLike,
    overrides?: CallOverrides,
  ): Promise<string>;
  fromSharedToBalanceB(
    sharedCash: BytesLike,
    sharedManaged: BytesLike,
    overrides?: CallOverrides,
  ): Promise<string>;
  increaseCash(
    balance: BytesLike,
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  isNotZero(balance: BytesLike, overrides?: CallOverrides): Promise<boolean>;
  isZero(balance: BytesLike, overrides?: CallOverrides): Promise<boolean>;
  lastChangeBlock(
    balance: BytesLike,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  managed(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  managedToCash(
    balance: BytesLike,
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  setManaged(
    balance: BytesLike,
    newManaged: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  toBalance(
    _cash: BigNumberish,
    _managed: BigNumberish,
    _lastChangeBlock: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;
  toSharedCash(
    tokenABalance: BytesLike,
    tokenBBalance: BytesLike,
    overrides?: CallOverrides,
  ): Promise<string>;
  toSharedManaged(
    tokenABalance: BytesLike,
    tokenBBalance: BytesLike,
    overrides?: CallOverrides,
  ): Promise<string>;
  total(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  totals(
    balances: BytesLike[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  callStatic: {
    cash(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    cashToManaged(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    decreaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    fromSharedToBalanceA(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    fromSharedToBalanceB(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    increaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    isNotZero(balance: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    isZero(balance: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    lastChangeBlock(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    managed(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    managedToCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    setManaged(
      balance: BytesLike,
      newManaged: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    toBalance(
      _cash: BigNumberish,
      _managed: BigNumberish,
      _lastChangeBlock: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
    toSharedCash(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    toSharedManaged(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    total(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    totals(
      balances: BytesLike[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
  };
  filters: {};
  estimateGas: {
    cash(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    cashToManaged(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    decreaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    fromSharedToBalanceA(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    fromSharedToBalanceB(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    increaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    isNotZero(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    isZero(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    lastChangeBlock(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    managed(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    managedToCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    setManaged(
      balance: BytesLike,
      newManaged: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    toBalance(
      _cash: BigNumberish,
      _managed: BigNumberish,
      _lastChangeBlock: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    toSharedCash(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    toSharedManaged(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    total(balance: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    totals(
      balances: BytesLike[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    cash(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    cashToManaged(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    decreaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    fromSharedToBalanceA(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    fromSharedToBalanceB(
      sharedCash: BytesLike,
      sharedManaged: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    increaseCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isNotZero(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    isZero(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    lastChangeBlock(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    managed(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    managedToCash(
      balance: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    setManaged(
      balance: BytesLike,
      newManaged: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    toBalance(
      _cash: BigNumberish,
      _managed: BigNumberish,
      _lastChangeBlock: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    toSharedCash(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    toSharedManaged(
      tokenABalance: BytesLike,
      tokenBBalance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    total(
      balance: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    totals(
      balances: BytesLike[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
