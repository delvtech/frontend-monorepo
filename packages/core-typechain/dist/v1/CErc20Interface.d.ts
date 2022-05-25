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
export interface CErc20InterfaceInterface extends utils.Interface {
  functions: {
    "_addReserves(uint256)": FunctionFragment;
    "balanceOfUnderlying(address)": FunctionFragment;
    "borrow(uint256)": FunctionFragment;
    "exchangeRateCurrent()": FunctionFragment;
    "exchangeRateStored()": FunctionFragment;
    "liquidateBorrow(address,uint256,address)": FunctionFragment;
    "mint(uint256)": FunctionFragment;
    "redeem(uint256)": FunctionFragment;
    "redeemUnderlying(uint256)": FunctionFragment;
    "repayBorrow(uint256)": FunctionFragment;
    "repayBorrowBehalf(address,uint256)": FunctionFragment;
    "underlying()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "_addReserves",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfUnderlying",
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: "borrow",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRateCurrent",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "exchangeRateStored",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "liquidateBorrow",
    values: [string, BigNumberish, string],
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "redeemUnderlying",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrow",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrowBehalf",
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "underlying",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "_addReserves",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRateCurrent",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "exchangeRateStored",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidateBorrow",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemUnderlying",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrow",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrowBehalf",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;
  events: {};
}
export interface CErc20Interface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CErc20InterfaceInterface;
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
    _addReserves(
      addAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    borrow(
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    exchangeRateCurrent(overrides?: CallOverrides): Promise<[BigNumber]>;
    exchangeRateStored(overrides?: CallOverrides): Promise<[BigNumber]>;
    liquidateBorrow(
      borrower: string,
      repayAmount: BigNumberish,
      cTokenCollateral: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mint(
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    redeem(
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    redeemUnderlying(
      redeemAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    repayBorrow(
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    repayBorrowBehalf(
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    underlying(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  _addReserves(
    addAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  balanceOfUnderlying(
    owner: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  borrow(
    borrowAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  exchangeRateCurrent(overrides?: CallOverrides): Promise<BigNumber>;
  exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;
  liquidateBorrow(
    borrower: string,
    repayAmount: BigNumberish,
    cTokenCollateral: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mint(
    mintAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  redeem(
    redeemTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  redeemUnderlying(
    redeemAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  repayBorrow(
    repayAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  repayBorrowBehalf(
    borrower: string,
    repayAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  underlying(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    _addReserves(
      addAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    balanceOfUnderlying(
      owner: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    borrow(
      borrowAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    exchangeRateCurrent(overrides?: CallOverrides): Promise<BigNumber>;
    exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;
    liquidateBorrow(
      borrower: string,
      repayAmount: BigNumberish,
      cTokenCollateral: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    mint(
      mintAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    redeem(
      redeemTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    redeemUnderlying(
      redeemAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    repayBorrow(
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    repayBorrowBehalf(
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    underlying(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    _addReserves(
      addAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    borrow(
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    exchangeRateCurrent(overrides?: CallOverrides): Promise<BigNumber>;
    exchangeRateStored(overrides?: CallOverrides): Promise<BigNumber>;
    liquidateBorrow(
      borrower: string,
      repayAmount: BigNumberish,
      cTokenCollateral: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mint(
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    redeem(
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    redeemUnderlying(
      redeemAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    repayBorrow(
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    repayBorrowBehalf(
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    underlying(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    _addReserves(
      addAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    balanceOfUnderlying(
      owner: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    borrow(
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    exchangeRateCurrent(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    exchangeRateStored(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    liquidateBorrow(
      borrower: string,
      repayAmount: BigNumberish,
      cTokenCollateral: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mint(
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    redeem(
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    redeemUnderlying(
      redeemAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    repayBorrow(
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    repayBorrowBehalf(
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    underlying(
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
