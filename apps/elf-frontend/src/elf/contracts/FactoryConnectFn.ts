import { Provider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";

export type FactoryConnectFn<TReturnContract extends Contract> = (
  address: string,
  signerOrProvider: Signer | Provider,
) => TReturnContract;
