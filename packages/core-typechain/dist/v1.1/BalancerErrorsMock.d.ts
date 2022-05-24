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
export interface BalancerErrorsMockInterface extends utils.Interface {
  functions: {
    "fail(uint256)": FunctionFragment;
  };
  encodeFunctionData(functionFragment: "fail", values: [BigNumberish]): string;
  decodeFunctionResult(functionFragment: "fail", data: BytesLike): Result;
  events: {};
}
export interface BalancerErrorsMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: BalancerErrorsMockInterface;
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
    fail(code: BigNumberish, overrides?: CallOverrides): Promise<[void]>;
  };
  fail(code: BigNumberish, overrides?: CallOverrides): Promise<void>;
  callStatic: {
    fail(code: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };
  filters: {};
  estimateGas: {
    fail(code: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    fail(
      code: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
