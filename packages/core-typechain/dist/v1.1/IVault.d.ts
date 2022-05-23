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
export declare type SingleSwapStruct = {
  poolId: BytesLike;
  kind: BigNumberish;
  assetIn: string;
  assetOut: string;
  amount: BigNumberish;
  userData: BytesLike;
};
export declare type SingleSwapStructOutput = [
  string,
  number,
  string,
  string,
  BigNumber,
  string,
] & {
  poolId: string;
  kind: number;
  assetIn: string;
  assetOut: string;
  amount: BigNumber;
  userData: string;
};
export declare type FundManagementStruct = {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
};
export declare type FundManagementStructOutput = [
  string,
  boolean,
  string,
  boolean,
] & {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
};
export interface IVaultInterface extends utils.Interface {
  functions: {
    "getPool(bytes32)": FunctionFragment;
    "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "getPool", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      SingleSwapStruct,
      FundManagementStruct,
      BigNumberish,
      BigNumberish,
    ],
  ): string;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  events: {};
}
export interface IVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IVaultInterface;
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
    getPool(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, number]>;
    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  getPool(
    poolId: BytesLike,
    overrides?: CallOverrides,
  ): Promise<[string, number]>;
  swap(
    singleSwap: SingleSwapStruct,
    funds: FundManagementStruct,
    limit: BigNumberish,
    deadline: BigNumberish,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    getPool(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, number]>;
    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getPool(
      poolId: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
