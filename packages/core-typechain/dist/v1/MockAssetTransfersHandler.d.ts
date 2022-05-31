import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockAssetTransfersHandlerInterface extends utils.Interface {
  functions: {
    "depositToInternalBalance(address,address,uint256)": FunctionFragment;
    "getInternalBalance(address,address)": FunctionFragment;
    "receiveAsset(address,uint256,address,bool)": FunctionFragment;
    "sendAsset(address,uint256,address,bool)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "depositToInternalBalance",
    values: [string, string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "getInternalBalance",
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: "receiveAsset",
    values: [string, BigNumberish, string, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: "sendAsset",
    values: [string, BigNumberish, string, boolean],
  ): string;
  decodeFunctionResult(
    functionFragment: "depositToInternalBalance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInternalBalance",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveAsset",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "sendAsset", data: BytesLike): Result;
  events: {};
}
export interface MockAssetTransfersHandler extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockAssetTransfersHandlerInterface;
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
    depositToInternalBalance(
      account: string,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    getInternalBalance(
      account: string,
      token: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;
    receiveAsset(
      asset: string,
      amount: BigNumberish,
      sender: string,
      fromInternalBalance: boolean,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
    sendAsset(
      asset: string,
      amount: BigNumberish,
      recipient: string,
      toInternalBalance: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  depositToInternalBalance(
    account: string,
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  getInternalBalance(
    account: string,
    token: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;
  receiveAsset(
    asset: string,
    amount: BigNumberish,
    sender: string,
    fromInternalBalance: boolean,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  sendAsset(
    asset: string,
    amount: BigNumberish,
    recipient: string,
    toInternalBalance: boolean,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    depositToInternalBalance(
      account: string,
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;
    getInternalBalance(
      account: string,
      token: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    receiveAsset(
      asset: string,
      amount: BigNumberish,
      sender: string,
      fromInternalBalance: boolean,
      overrides?: CallOverrides,
    ): Promise<void>;
    sendAsset(
      asset: string,
      amount: BigNumberish,
      recipient: string,
      toInternalBalance: boolean,
      overrides?: CallOverrides,
    ): Promise<void>;
  };
  filters: {};
  estimateGas: {
    depositToInternalBalance(
      account: string,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    getInternalBalance(
      account: string,
      token: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
    receiveAsset(
      asset: string,
      amount: BigNumberish,
      sender: string,
      fromInternalBalance: boolean,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
    sendAsset(
      asset: string,
      amount: BigNumberish,
      recipient: string,
      toInternalBalance: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    depositToInternalBalance(
      account: string,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    getInternalBalance(
      account: string,
      token: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    receiveAsset(
      asset: string,
      amount: BigNumberish,
      sender: string,
      fromInternalBalance: boolean,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
    sendAsset(
      asset: string,
      amount: BigNumberish,
      recipient: string,
      toInternalBalance: boolean,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
