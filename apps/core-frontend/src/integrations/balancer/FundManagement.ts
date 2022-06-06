/**
 * This is taken from the IVault.sol, which uses this interface for SwapIn and
 * SwapOut operations.
 */
export interface FundManagement {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
}
