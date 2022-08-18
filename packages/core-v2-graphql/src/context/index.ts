import { Provider } from "@ethersproject/providers";

export interface CoreV2Context {
  chainId: number;
  provider: Provider;
  elementDataSources: Record<string, any>;
}
