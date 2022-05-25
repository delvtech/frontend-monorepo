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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockFlashLoanRecipientInterface extends utils.Interface {
  functions: {
    "receiveFlashLoan(address[],uint256[],uint256[],bytes)": FunctionFragment;
    "reenter()": FunctionFragment;
    "repayInExcess()": FunctionFragment;
    "repayLoan()": FunctionFragment;
    "setReenter(bool)": FunctionFragment;
    "setRepayInExcess(bool)": FunctionFragment;
    "setRepayLoan(bool)": FunctionFragment;
    "vault()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "receiveFlashLoan",
    values: [string[], BigNumberish[], BigNumberish[], BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "reenter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "repayInExcess",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "repayLoan", values?: undefined): string;
  encodeFunctionData(functionFragment: "setReenter", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setRepayInExcess",
    values: [boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "setRepayLoan",
    values: [boolean],
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;
  decodeFunctionResult(
    functionFragment: "receiveFlashLoan",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "reenter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "repayInExcess",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "repayLoan", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setReenter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRepayInExcess",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRepayLoan",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
  events: {};
}
export interface MockFlashLoanRecipient extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockFlashLoanRecipientInterface;
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
    receiveFlashLoan(
      tokens: string[],
      amounts: BigNumberish[],
      feeAmounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    reenter(overrides?: CallOverrides): Promise<[boolean]>;
    repayInExcess(overrides?: CallOverrides): Promise<[boolean]>;
    repayLoan(overrides?: CallOverrides): Promise<[boolean]>;
    setReenter(
      _reenter: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    vault(overrides?: CallOverrides): Promise<[string]>;
  };
  receiveFlashLoan(
    tokens: string[],
    amounts: BigNumberish[],
    feeAmounts: BigNumberish[],
    userData: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  reenter(overrides?: CallOverrides): Promise<boolean>;
  repayInExcess(overrides?: CallOverrides): Promise<boolean>;
  repayLoan(overrides?: CallOverrides): Promise<boolean>;
  setReenter(
    _reenter: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setRepayInExcess(
    _repayInExcess: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  setRepayLoan(
    _repayLoan: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  vault(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    receiveFlashLoan(
      tokens: string[],
      amounts: BigNumberish[],
      feeAmounts: BigNumberish[],
      userData: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>;
    reenter(overrides?: CallOverrides): Promise<boolean>;
    repayInExcess(overrides?: CallOverrides): Promise<boolean>;
    repayLoan(overrides?: CallOverrides): Promise<boolean>;
    setReenter(_reenter: boolean, overrides?: CallOverrides): Promise<void>;
    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: CallOverrides,
    ): Promise<void>;
    setRepayLoan(_repayLoan: boolean, overrides?: CallOverrides): Promise<void>;
    vault(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    receiveFlashLoan(
      tokens: string[],
      amounts: BigNumberish[],
      feeAmounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    reenter(overrides?: CallOverrides): Promise<BigNumber>;
    repayInExcess(overrides?: CallOverrides): Promise<BigNumber>;
    repayLoan(overrides?: CallOverrides): Promise<BigNumber>;
    setReenter(
      _reenter: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    vault(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    receiveFlashLoan(
      tokens: string[],
      amounts: BigNumberish[],
      feeAmounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    reenter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    repayInExcess(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    repayLoan(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    setReenter(
      _reenter: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
