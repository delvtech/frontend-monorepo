import { Provider } from "@ethersproject/providers";
import { TokenContract } from "src/datasources/TokenContract";

export interface CoreV2Context {
  chainId: number;
  provider: Provider;
  elementDataSources: {
    tokenContracts: TokenContract[];
  };
}
