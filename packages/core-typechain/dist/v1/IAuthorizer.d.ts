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
export interface IAuthorizerInterface extends utils.Interface {
  functions: {
    "canPerform(bytes32,address,address)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "canPerform",
    values: [BytesLike, string, string],
  ): string;
  decodeFunctionResult(functionFragment: "canPerform", data: BytesLike): Result;
  events: {};
}
export interface IAuthorizer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IAuthorizerInterface;
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
    canPerform(
      actionId: BytesLike,
      account: string,
      where: string,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;
  };
  canPerform(
    actionId: BytesLike,
    account: string,
    where: string,
    overrides?: CallOverrides,
  ): Promise<boolean>;
  callStatic: {
    canPerform(
      actionId: BytesLike,
      account: string,
      where: string,
      overrides?: CallOverrides,
    ): Promise<boolean>;
  };
  filters: {};
  estimateGas: {
    canPerform(
      actionId: BytesLike,
      account: string,
      where: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    canPerform(
      actionId: BytesLike,
      account: string,
      where: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
