import { Provider } from "@ethersproject/providers";

export interface V2Context {
  chainId: number;
  provider: Provider;
}
