/**
 * Returns true if the tranche is expired.
 *
 * @param unlockTimestamp - time in seconds, you can get this directly from the tokenInfo
 */
export function getIsMature(unlockTimestamp: number): boolean {
  const now = Date.now();
  if (now >= unlockTimestamp * 1000) {
    return true;
  }
  return false;
}
