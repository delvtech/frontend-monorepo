export function throwInvalidAddressError(tokenAddress: string): never {
  throw new Error(
    `Invalid parameter while deploying vault: ${tokenAddress} is not a valid address!`,
  );
}
