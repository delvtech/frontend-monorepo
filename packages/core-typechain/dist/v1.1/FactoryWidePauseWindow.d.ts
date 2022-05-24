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
export interface FactoryWidePauseWindowInterface extends utils.Interface {
  functions: {
    "getPauseConfiguration()": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "getPauseConfiguration",
    values?: undefined,
  ): string;
  decodeFunctionResult(
    functionFragment: "getPauseConfiguration",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface FactoryWidePauseWindow extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: FactoryWidePauseWindowInterface;
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
    getPauseConfiguration(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber] & {
        pauseWindowDuration: BigNumber;
        bufferPeriodDuration: BigNumber;
      }
    >;
  };
  getPauseConfiguration(overrides?: CallOverrides): Promise<
    [BigNumber, BigNumber] & {
      pauseWindowDuration: BigNumber;
      bufferPeriodDuration: BigNumber;
    }
  >;
  callStatic: {
    getPauseConfiguration(overrides?: CallOverrides): Promise<
      [BigNumber, BigNumber] & {
        pauseWindowDuration: BigNumber;
        bufferPeriodDuration: BigNumber;
      }
    >;
  };
  filters: {};
  estimateGas: {
    getPauseConfiguration(overrides?: CallOverrides): Promise<BigNumber>;
  };
  populateTransaction: {
    getPauseConfiguration(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
