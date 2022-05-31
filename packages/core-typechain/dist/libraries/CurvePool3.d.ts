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
export interface CurvePool3Interface extends utils.Interface {
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
