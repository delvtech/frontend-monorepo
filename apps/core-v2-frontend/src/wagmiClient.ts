import { connectors } from "src/wallets/connectors";
import { provider } from "src/provider";
import { createClient } from "wagmi";

export const wagmiClient = createClient({
  // eagerly reconnect the user's wallet
  autoConnect: true,
  connectors,
  provider,
});
