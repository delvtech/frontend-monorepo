import { MockERC20__factory } from "@elementfi/core-v2-typechain";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { toBn } from "evm-bn";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const { PRIVATE_KEY } = process.env;

interface MintTaskArgs {
  token: string;
  who: string;
  amount: string;
}

async function mintTokens(args: MintTaskArgs, provider: JsonRpcProvider) {
  if (!PRIVATE_KEY) {
    throw new Error("Error: no private key set in .env");
  }

  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const token = MockERC20__factory.connect(args.token, provider);
  const decimals = await token.decimals();

  console.log("Submitting transaction...");
  const tx = await token
    .connect(wallet)
    .mint(args.who, toBn(args.amount, decimals));

  console.log("Waiting for transaction...");
  const reciept = await tx.wait();
  console.log("Transaction hash: ", reciept.transactionHash);
}

export default task("mint", "mints tokens to an account")
  .addParam("token", "ERC20 token address")
  .addParam("who", "account to recieve tokens")
  .addParam(
    "amount",
    "amount of tokens to mint account, decimals applied automatically",
  )
  .setAction(async (taskArgs: MintTaskArgs, hre: HardhatRuntimeEnvironment) =>
    mintTokens(taskArgs, hre.ethers.provider),
  );
