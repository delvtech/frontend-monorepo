// Example:
// const ipfsFormat = {
//   block: 1234567,
//   leaves: [
//     {
//       address: "0xASDF...ASDF",
//       data: [
//         { tokenAddress: "0xASDF...ASDF", balance: "100", "rewards": "1"},
//         { tokenAddress: "0xASDF...ASDF", balance: undefined, rewards: undefined }
//       ]
//     },
//   ];
// }

export interface IPFSData {
  block: number;
  leaves: Leaf[];
}

export interface Leaf {
  /**
   * hexadecimal ethereum address
   */
  address: string;
  /**
   * list of balances and rewards for each token the
   */
  data: LeafData[];
}

export interface LeafData {
  /**
   * hexadecimal ethereum address
   */
  tokenAddress: string;

  /**
   * whole number value in the token's atomic unit.  i.e. 1 WETH would be "1000000000000000000".
   */
  balance: string | undefined;

  /**
   * whole number value for the running total amount of rewards the account has accrued.
   */
  rewards: string | undefined;
}
