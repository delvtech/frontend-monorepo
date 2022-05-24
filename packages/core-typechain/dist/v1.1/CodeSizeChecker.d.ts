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
export interface CodeSizeCheckerInterface extends utils.Interface {
  functions: {
    "codeSize(address)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "codeSize", values: [string]): string;
  decodeFunctionResult(functionFragment: "codeSize", data: BytesLike): Result;
  events: {};
}
export interface CodeSizeChecker extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: CodeSizeCheckerInterface;
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
    codeSize(
      which: string,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber] & {
        ret: BigNumber;
      }
    >;
  };
  codeSize(which: string, overrides?: CallOverrides): Promise<BigNumber>;
  callStatic: {
    codeSize(which: string, overrides?: CallOverrides): Promise<BigNumber>;
  };
  filters: {};
  estimateGas: {
    codeSize(which: string, overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    codeSize(
      which: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
