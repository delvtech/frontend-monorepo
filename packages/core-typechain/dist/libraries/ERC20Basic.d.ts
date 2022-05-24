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
export interface ERC20BasicInterface extends utils.Interface {
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
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    value: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
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
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null,
    ): TransferEventFilter;
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
