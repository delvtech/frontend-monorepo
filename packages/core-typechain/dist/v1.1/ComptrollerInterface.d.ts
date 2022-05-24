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
export interface ComptrollerInterfaceInterface extends utils.Interface {
  functions: {
    "borrowAllowed(address,address,uint256)": FunctionFragment;
    "borrowVerify(address,address,uint256)": FunctionFragment;
    "claimComp(address,address[])": FunctionFragment;
    "enterMarkets(address[])": FunctionFragment;
    "exitMarket(address)": FunctionFragment;
    "isComptroller()": FunctionFragment;
    "liquidateBorrowAllowed(address,address,address,address,uint256)": FunctionFragment;
    "liquidateBorrowVerify(address,address,address,address,uint256,uint256)": FunctionFragment;
    "liquidateCalculateSeizeTokens(address,address,uint256)": FunctionFragment;
    "mintAllowed(address,address,uint256)": FunctionFragment;
    "mintVerify(address,address,uint256,uint256)": FunctionFragment;
    "redeemAllowed(address,address,uint256)": FunctionFragment;
    "redeemVerify(address,address,uint256,uint256)": FunctionFragment;
    "repayBorrowAllowed(address,address,address,uint256)": FunctionFragment;
    "repayBorrowVerify(address,address,address,uint256,uint256)": FunctionFragment;
    "seizeAllowed(address,address,address,address,uint256)": FunctionFragment;
    "seizeVerify(address,address,address,address,uint256)": FunctionFragment;
    "transferAllowed(address,address,address,uint256)": FunctionFragment;
    "transferVerify(address,address,address,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "borrowAllowed",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "borrowVerify",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "claimComp",
    values: [string, string[]],
  ): string;
  encodeFunctionData(
    functionFragment: "enterMarkets",
    values: [string[]],
  ): string;
  encodeFunctionData(functionFragment: "exitMarket", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isComptroller",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "liquidateBorrowAllowed",
    values: [string, string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "liquidateBorrowVerify",
    values: [string, string, string, string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "liquidateCalculateSeizeTokens",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "mintAllowed",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "mintVerify",
    values: [string, string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAllowed",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "redeemVerify",
    values: [string, string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrowAllowed",
    values: [string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrowVerify",
    values: [string, string, string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "seizeAllowed",
    values: [string, string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "seizeVerify",
    values: [string, string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferAllowed",
    values: [string, string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "transferVerify",
    values: [string, string, string, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "borrowAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowVerify",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "claimComp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enterMarkets",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "exitMarket", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isComptroller",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidateBorrowAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidateBorrowVerify",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidateCalculateSeizeTokens",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "mintVerify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemVerify",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrowAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrowVerify",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "seizeAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "seizeVerify",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAllowed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferVerify",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface ComptrollerInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ComptrollerInterfaceInterface;
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
    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    borrowVerify(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    claimComp(
      holder: string,
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    exitMarket(
      cToken: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    isComptroller(overrides?: CallOverrides): Promise<[boolean]>;
    liquidateBorrowAllowed(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    liquidateBorrowVerify(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    liquidateCalculateSeizeTokens(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    mintVerify(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      mintTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    repayBorrowVerify(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      borrowerIndex: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    seizeVerify(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    transferVerify(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  borrowAllowed(
    cToken: string,
    borrower: string,
    borrowAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  borrowVerify(
    cToken: string,
    borrower: string,
    borrowAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  claimComp(
    holder: string,
    cTokens: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  enterMarkets(
    cTokens: string[],
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  exitMarket(
    cToken: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  isComptroller(overrides?: CallOverrides): Promise<boolean>;
  liquidateBorrowAllowed(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    liquidator: string,
    borrower: string,
    repayAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  liquidateBorrowVerify(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    liquidator: string,
    borrower: string,
    repayAmount: BigNumberish,
    seizeTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  liquidateCalculateSeizeTokens(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    repayAmount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<[BigNumber, BigNumber]>;
  mintAllowed(
    cToken: string,
    minter: string,
    mintAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  mintVerify(
    cToken: string,
    minter: string,
    mintAmount: BigNumberish,
    mintTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  redeemAllowed(
    cToken: string,
    redeemer: string,
    redeemTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  redeemVerify(
    cToken: string,
    redeemer: string,
    redeemAmount: BigNumberish,
    redeemTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  repayBorrowAllowed(
    cToken: string,
    payer: string,
    borrower: string,
    repayAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  repayBorrowVerify(
    cToken: string,
    payer: string,
    borrower: string,
    repayAmount: BigNumberish,
    borrowerIndex: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  seizeAllowed(
    cTokenCollateral: string,
    cTokenBorrowed: string,
    liquidator: string,
    borrower: string,
    seizeTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  seizeVerify(
    cTokenCollateral: string,
    cTokenBorrowed: string,
    liquidator: string,
    borrower: string,
    seizeTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  transferAllowed(
    cToken: string,
    src: string,
    dst: string,
    transferTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  transferVerify(
    cToken: string,
    src: string,
    dst: string,
    transferTokens: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    borrowVerify(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    claimComp(
      holder: string,
      cTokens: string[],
      overrides?: CallOverrides,
    ): Promise<void>;
    enterMarkets(
      cTokens: string[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;
    exitMarket(cToken: string, overrides?: CallOverrides): Promise<BigNumber>;
    isComptroller(overrides?: CallOverrides): Promise<boolean>;
    liquidateBorrowAllowed(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    liquidateBorrowVerify(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      seizeTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    liquidateCalculateSeizeTokens(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, BigNumber]>;
    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    mintVerify(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      mintTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    repayBorrowVerify(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      borrowerIndex: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    seizeVerify(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    transferVerify(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    borrowVerify(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    claimComp(
      holder: string,
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    exitMarket(
      cToken: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    isComptroller(overrides?: CallOverrides): Promise<BigNumber>;
    liquidateBorrowAllowed(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    liquidateBorrowVerify(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    liquidateCalculateSeizeTokens(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    mintVerify(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      mintTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    repayBorrowVerify(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      borrowerIndex: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    seizeVerify(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    transferVerify(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    borrowAllowed(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    borrowVerify(
      cToken: string,
      borrower: string,
      borrowAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    claimComp(
      holder: string,
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    enterMarkets(
      cTokens: string[],
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    exitMarket(
      cToken: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    isComptroller(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    liquidateBorrowAllowed(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    liquidateBorrowVerify(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      liquidator: string,
      borrower: string,
      repayAmount: BigNumberish,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    liquidateCalculateSeizeTokens(
      cTokenBorrowed: string,
      cTokenCollateral: string,
      repayAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    mintAllowed(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    mintVerify(
      cToken: string,
      minter: string,
      mintAmount: BigNumberish,
      mintTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    redeemAllowed(
      cToken: string,
      redeemer: string,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    redeemVerify(
      cToken: string,
      redeemer: string,
      redeemAmount: BigNumberish,
      redeemTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    repayBorrowAllowed(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    repayBorrowVerify(
      cToken: string,
      payer: string,
      borrower: string,
      repayAmount: BigNumberish,
      borrowerIndex: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    seizeAllowed(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    seizeVerify(
      cTokenCollateral: string,
      cTokenBorrowed: string,
      liquidator: string,
      borrower: string,
      seizeTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    transferAllowed(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    transferVerify(
      cToken: string,
      src: string,
      dst: string,
      transferTokens: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
