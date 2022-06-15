/**
 * The amount and timestamp when the value changes
 */
export interface ValueChange {
  // when the value change occured, could be a timestamp or blocknumber
  at: number;

  // the amount the value changed by, either positive or negative
  valueChange: bigint;
}
