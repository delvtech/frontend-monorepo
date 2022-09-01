import { TokenInfo } from "@uniswap/token-lists";

export interface PrincipalTokenInfo extends TokenInfo {
  extensions: {
    /**
     * The underlying base asset for the principal token
     */
    underlying: string;

    /**
     * The wrapped position, eg: an Element yearn vault asset proxy
     */
    position: string;

    /**
     * Number of seconds after epoch when the principal token was created
     */
    createdAtTimestamp: number;

    /**
     * Number of seconds after epoch when the principal token can be redeemed
     */
    expiryTimestamp: number;

    /**
     * The 1155 multi token contract that this token belongs to
     */
    multiTerm: string;

    /**
     * The identifier for this token in the multiTerm
     */
    tokenId: number;
  };
}

export interface PrincipalPoolTokenInfo extends TokenInfo {
  extensions: {
    /**
     * The principal token address
     */
    principalToken: string;

    /**
     * The underlying base asset for the principal token
     */
    underlying: string;

    /**
     * Number of seconds after epoch when the pool was created
     */
    createdAtTimestamp: number;

    /**
     * Number of seconds after epoch when the pool assets will converge in
     * price
     */
    expiryTimestamp: number;

    /**
     * The 1155 multi token contract that this token belongs to
     */
    multiPool: string;

    /**
     * The identifier for this token in the multiPool
     */
    poolId: number;
  };
}
