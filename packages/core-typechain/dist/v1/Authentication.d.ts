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
export interface AuthenticationInterface extends utils.Interface {
  functions: {
    "getActionId(bytes4)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getActionId",
    values: [BytesLike],
  ): string;
  decodeFunctionResult(
    functionFragment: "getActionId",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface Authentication extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: AuthenticationInterface;
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
  };
  getActionId(selector: BytesLike, overrides?: CallOverrides): Promise<string>;
  callStatic: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<string>;
  };
  filters: {};
  estimateGas: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    getActionId(
      selector: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
