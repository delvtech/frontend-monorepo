export function sortAddresses(addresses: string[]): string[] {
  const lowerCaseAddresses = addresses.map((address) => address.toLowerCase());

  // map of lower case addresses to mixed case addresses
  const addressMap: Record<string, string> = {};
  lowerCaseAddresses.forEach((lowerCaseAddress, index) => {
    addressMap[lowerCaseAddress] = addresses[index];
  });

  const sortedLowerCaseAddresses = lowerCaseAddresses.map((a) => a).sort();
  const sortedAddresses = sortedLowerCaseAddresses.map(
    (lowerCaseAddress) => addressMap[lowerCaseAddress],
  );

  return sortedAddresses;
}
