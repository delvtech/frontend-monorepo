import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockFactoryCreatedPoolInterface extends utils.Interface {
  functions: {
    "getPoolId()": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "getPoolId", values?: undefined): string;
  decodeFunctionResult(functionFragment: "getPoolId", data: BytesLike): Result;
  events: {};
}
export interface MockFactoryCreatedPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: MockFactoryCreatedPoolInterface;
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
    getPoolId(overrides?: CallOverrides): Promise<[string]>;
  };
  getPoolId(overrides?: CallOverrides): Promise<string>;
  callStatic: {
    getPoolId(overrides?: CallOverrides): Promise<string>;
  };
  filters: {};
  estimateGas: {
    getPoolId(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    getPoolId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
