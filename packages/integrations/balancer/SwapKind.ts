/**
 * This is taken from the IVault.sol, which uses an enum to specify whether a
 * swap is given in or given out. See `useQueryBatchSwap` for examples.
 */
export enum SwapKind {
  GIVEN_IN,
  GIVEN_OUT,
}
