import { Signer } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ERC20__factory } from "src/types/factories/ERC20__factory";
import { Vault } from "src/types/Vault";

export async function printTokenInfoForPool(
  vault: Vault,
  poolId: string,
  signer: Signer,
): Promise<void> {
  const tokenInfo = await vault.getPoolTokens(poolId);
  const [tokens, balances] = tokenInfo;
  const token0 = ERC20__factory.connect(tokens[0], signer);
  const token0Name = await token0.symbol();
  const token0Decimals = await token0.decimals();
  const token1 = ERC20__factory.connect(tokens[1], signer);
  const token1Name = await token1.symbol();
  const token1Decimals = await token1.decimals();
  console.log(
    token0Name + " ".repeat(30 - token0Name.length),
    formatUnits(balances[0], token0Decimals),
  );
  console.log(
    token1Name + " ".repeat(30 - token1Name.length),
    formatUnits(balances[1], token1Decimals),
  );
}
