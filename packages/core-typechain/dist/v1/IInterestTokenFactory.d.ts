import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IInterestTokenFactoryInterface extends utils.Interface {
  functions: {
    "deployInterestToken(address,string,uint256,uint8)": FunctionFragment;
  };
  encodeFunctionData(
    functionFragment: "deployInterestToken",
    values: [string, string, BigNumberish, BigNumberish],
  ): string;
  decodeFunctionResult(
    functionFragment: "deployInterestToken",
    data: BytesLike,
  ): Result;
  events: {};
}
export interface IInterestTokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: IInterestTokenFactoryInterface;
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
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<ContractTransaction>;
  };
  deployInterestToken(
    tranche: string,
    strategySymbol: string,
    expiration: BigNumberish,
    underlyingDecimals: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ContractTransaction>;
  callStatic: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
  };
  filters: {};
  estimateGas: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      },
    ): Promise<PopulatedTransaction>;
  };
}
