import { useEffect } from "react";
import { usePrevious } from "react-use";
import { useAccount } from "wagmi";

/**
 * Invokes a callback when the user connects their wallet.
 * @param callback The function to run when the wallet is connected
 */
export default function useOnConnected(callback: () => void): void {
  const { isConnected } = useAccount();
  const previousActive = usePrevious(isConnected);
  useEffect(() => {
    if (!previousActive && isConnected) {
      callback();
    }
  }, [previousActive, isConnected, callback]);
}
