import { connectors } from "src/wallets/connectors2";
import { provider } from "src/provider";
import { createClient } from "wagmi";

/**
 * The wagmi Client manages wallet connection state and configuration, such as:
 * auto-connection, connectors, and switching providers.
 *
 *  See: https://wagmi.sh/docs/client
 */
export const wagmiClient = createClient({
  // eagerly reconnect the user's wallet
  autoConnect: true,
  connectors,
  provider,
});
