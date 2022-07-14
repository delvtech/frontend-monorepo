import { Provider } from "@ethersproject/providers";

export interface CouncilContext {
  chainId: number;
  provider: Provider;
}
