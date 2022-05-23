/**
 * Can't await on transactionSend because it will never resolve due to
 * automine disabled. Save a promise instead and resolve it later.
 * Should set gasLimit on txs because default gasLimit is blockGasLimit.
 *   promise = signer.sendTransaction({
 *      to: signer.address,
 *      value: 1,
 *    });
 *   const txReceipt = await promise;
 * @param {func} Lambda to run within the same block.
 */
async function mineInBlock(lambda) {
  await ethers.provider.send("evm_setAutomine", [false]);
  await lambda();
  await ethers.provider.send("evm_mine");
  await ethers.provider.send("evm_setAutomine", [true]);
}
