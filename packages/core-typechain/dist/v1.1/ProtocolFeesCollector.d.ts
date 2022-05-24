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
export interface ProtocolFeesCollectorInterface extends utils.Interface {
  functions: {
    "getActionId(bytes4)": FunctionFragment;
    "getAuthorizer()": FunctionFragment;
    "getCollectedFeeAmounts(address[])": FunctionFragment;
    "getFlashLoanFeePercentage()": FunctionFragment;
    "getSwapFeePercentage()": FunctionFragment;
    "setFlashLoanFeePercentage(uint256)": FunctionFragment;
    "setSwapFeePercentage(uint256)": FunctionFragment;
    "vault()": FunctionFragment;
    "withdrawCollectedFees(address[],uint256[],address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getActionId",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthorizer",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectedFeeAmounts",
    values: [string[]],
  ): string;
  encodeFunctionData(
    functionFragment: "getFlashLoanFeePercentage",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapFeePercentage",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "setFlashLoanFeePercentage",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "setSwapFeePercentage",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawCollectedFees",
    values: [string[], BigNumberish[], string],
  ): string;
  decodeFunctionResult(
    functionFragment: "getActionId",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuthorizer",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollectedFeeAmounts",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFlashLoanFeePercentage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapFeePercentage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFlashLoanFeePercentage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSwapFeePercentage",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCollectedFees",
    data: BytesLike,
  ): Result;
  events: {
    "FlashLoanFeePercentageChanged(uint256)": EventFragment;
    "SwapFeePercentageChanged(uint256)": EventFragment;
  };
  getEvent(
    nameOrSignatureOrTopic: "FlashLoanFeePercentageChanged",
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapFeePercentageChanged"): EventFragment;
}
export declare type FlashLoanFeePercentageChangedEvent = TypedEvent<
  [BigNumber],
  {
    newFlashLoanFeePercentage: BigNumber;
  }
>;
export declare type FlashLoanFeePercentageChangedEventFilter =
  TypedEventFilter<FlashLoanFeePercentageChangedEvent>;
export declare type SwapFeePercentageChangedEvent = TypedEvent<
  [BigNumber],
  {
    newSwapFeePercentage: BigNumber;
  }
>;
export declare type SwapFeePercentageChangedEventFilter =
  TypedEventFilter<SwapFeePercentageChangedEvent>;
export interface ProtocolFeesCollector extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ProtocolFeesCollectorInterface;
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
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string]>;
    getAuthorizer(overrides?: CallOverrides): Promise<[string]>;
    getCollectedFeeAmounts(
      tokens: string[],
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber[]] & {
        feeAmounts: BigNumber[];
      }
    >;
    getFlashLoanFeePercentage(overrides?: CallOverrides): Promise<[BigNumber]>;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<[BigNumber]>;
    setFlashLoanFeePercentage(
      newFlashLoanFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setSwapFeePercentage(
      newSwapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    vault(overrides?: CallOverrides): Promise<[string]>;
    withdrawCollectedFees(
      tokens: string[],
      amounts: BigNumberish[],
      recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  getActionId(selector: BytesLike, overrides?: CallOverrides): Promise<string>;
  getAuthorizer(overrides?: CallOverrides): Promise<string>;
  getCollectedFeeAmounts(
    tokens: string[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;
  getFlashLoanFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
  getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
  setFlashLoanFeePercentage(
    newFlashLoanFeePercentage: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setSwapFeePercentage(
    newSwapFeePercentage: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  vault(overrides?: CallOverrides): Promise<string>;
  withdrawCollectedFees(
    tokens: string[],
    amounts: BigNumberish[],
    recipient: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
    getAuthorizer(overrides?: CallOverrides): Promise<string>;
    getCollectedFeeAmounts(
      tokens: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    getFlashLoanFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    setFlashLoanFeePercentage(
      newFlashLoanFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    setSwapFeePercentage(
      newSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    vault(overrides?: CallOverrides): Promise<string>;
    withdrawCollectedFees(
      tokens: string[],
      amounts: BigNumberish[],
      recipient: string,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {
    "FlashLoanFeePercentageChanged(uint256)"(
      newFlashLoanFeePercentage?: null,
    ): FlashLoanFeePercentageChangedEventFilter;
    FlashLoanFeePercentageChanged(
      newFlashLoanFeePercentage?: null,
    ): FlashLoanFeePercentageChangedEventFilter;
    "SwapFeePercentageChanged(uint256)"(
      newSwapFeePercentage?: null,
    ): SwapFeePercentageChangedEventFilter;
    SwapFeePercentageChanged(
      newSwapFeePercentage?: null,
    ): SwapFeePercentageChangedEventFilter;
  };
  estimateGas: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getAuthorizer(overrides?: CallOverrides): Promise<BigNumber>;
    getCollectedFeeAmounts(
      tokens: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    getFlashLoanFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    getSwapFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;
    setFlashLoanFeePercentage(
      newFlashLoanFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setSwapFeePercentage(
      newSwapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    vault(overrides?: CallOverrides): Promise<BigNumber>;
    withdrawCollectedFees(
      tokens: string[],
      amounts: BigNumberish[],
      recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getAuthorizer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getCollectedFeeAmounts(
      tokens: string[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getFlashLoanFeePercentage(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    getSwapFeePercentage(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    setFlashLoanFeePercentage(
      newFlashLoanFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setSwapFeePercentage(
      newSwapFeePercentage: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    withdrawCollectedFees(
      tokens: string[],
      amounts: BigNumberish[],
      recipient: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
