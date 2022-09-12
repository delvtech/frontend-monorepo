import { BigNumberish, ContractTransaction, Overrides, Signer } from "ethers";
/**
 * A method to buy yield tokens.  Unclear at this point if this is simply performing the internal flashloan to perform a YTC.
 * @param tokenAddress
 * @param vaultAddress
 * @param amount
 * @param signer
 * @param overrides
 * @returns
 */
export function buyYieldTokens(tokenAddress: string, vaultAddress: string, amount: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * calculates a trade of prinicipal tokens
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calcSwapConvergentCurvePool(tokenAmountsIn: BigNumberish[], tokenReserves: BigNumberish[]): string;
/**
 * calculates an amount of LP tokens out for an amount of asset provided.  could be single sided or double sided.
 * this one is likely to get a lot more complicated.  there could be join kinds like exact amount in, exact amount out etc.
 * @param tokenAmountsIn
 * @param tokenReserves
 * @returns
 */
export function calculateLPTokensOut(tokenAmountsIn: BigNumberish[], tokenReserves: BigNumberish[]): string;
/**
 * A function to provide liquidity to a v2 term
 * @param tokensInAddresses
 * @param amounts
 * @param vaultAddress
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export function provideLiquidity(amounts: BigNumberish[], tokensInAddresses: string[], vaultAddress: string, slippage: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * redeem liquidity after the term is mature to the underlying
 * @param amount
 * @param poolAddress
 * @param signer
 * @param overrides
 * @returns
 */
export function redeemLiquidity(amount: BigNumberish, poolAddress: string, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * performs a trade of principal tokens on a v2 pool
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenInAddress
 * @param tokenOutAddress
 * @param vaultAddress
 * @param amount
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export function tradePrincipalTokens(amount: BigNumberish, tokenInAddress: string, tokenOutAddress: string, vaultAddress: string, slippage: BigNumberish, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;
/**
 * withdraw liquidity before the term is expired to underlying and pts
 * @param amount
 * @param poolAddress
 * @param signer
 * @param overrides
 * @returns
 */
export function withdrawLiquidity(amount: BigNumberish, poolAddress: string, signer: Signer, overrides?: Overrides): Promise<ContractTransaction>;

//# sourceMappingURL=main.d.ts.map
