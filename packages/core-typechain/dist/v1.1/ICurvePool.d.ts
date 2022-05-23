import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ICurvePoolInterface extends utils.Interface {
  functions: {
    "add_liquidity(uint256[2],uint256)": FunctionFragment;
    "remove_liquidity_one_coin(uint256,int128,uint256)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "add_liquidity",
    values: [[BigNumberish, BigNumberish], BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "remove_liquidity_one_coin",
    values: [BigNumberish, BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "add_liquidity",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "remove_liquidity_one_coin",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface ICurvePool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: ICurvePoolInterface;
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
    "add_liquidity(uint256[2],uint256)"(
      amountCtx: [BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    "add_liquidity(uint256[3],uint256)"(
      amountCtx: [BigNumberish, BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    "remove_liquidity_one_coin(uint256,int128,uint256)"(
      amount: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    "remove_liquidity_one_coin(uint256,uint256,uint256)"(
      amountLp: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  "add_liquidity(uint256[2],uint256)"(
    amountCtx: [BigNumberish, BigNumberish],
    minAmount: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  "add_liquidity(uint256[3],uint256)"(
    amountCtx: [BigNumberish, BigNumberish, BigNumberish],
    minAmount: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  "remove_liquidity_one_coin(uint256,int128,uint256)"(
    amount: BigNumberish,
    idx: BigNumberish,
    minAmount: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  "remove_liquidity_one_coin(uint256,uint256,uint256)"(
    amountLp: BigNumberish,
    idx: BigNumberish,
    minAmount: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    "add_liquidity(uint256[2],uint256)"(
      amountCtx: [BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    "add_liquidity(uint256[3],uint256)"(
      amountCtx: [BigNumberish, BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    "remove_liquidity_one_coin(uint256,int128,uint256)"(
      amount: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    "remove_liquidity_one_coin(uint256,uint256,uint256)"(
      amountLp: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    "add_liquidity(uint256[2],uint256)"(
      amountCtx: [BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    "add_liquidity(uint256[3],uint256)"(
      amountCtx: [BigNumberish, BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    "remove_liquidity_one_coin(uint256,int128,uint256)"(
      amount: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    "remove_liquidity_one_coin(uint256,uint256,uint256)"(
      amountLp: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    "add_liquidity(uint256[2],uint256)"(
      amountCtx: [BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    "add_liquidity(uint256[3],uint256)"(
      amountCtx: [BigNumberish, BigNumberish, BigNumberish],
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    "remove_liquidity_one_coin(uint256,int128,uint256)"(
      amount: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    "remove_liquidity_one_coin(uint256,uint256,uint256)"(
      amountLp: BigNumberish,
      idx: BigNumberish,
      minAmount: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
