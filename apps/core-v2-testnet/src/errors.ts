export function throwInvalidAddressError(tokenAddress: string): never {
  throw new Error(`Invalid parameter ${tokenAddress} is not a valid address!`);
}
