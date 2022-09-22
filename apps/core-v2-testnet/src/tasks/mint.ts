import {
  ERC20,
  ERC20__factory,
  MockERC20__factory,
} from "@elementfi/core-v2-typechain";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumberish, ethers, Wallet, BigNumber } from "ethers";
import { ethers as hEthers } from "hardhat";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { giveTokens } from "src/helpers/giveTokens";

interface MintTaskArgs {
  tokenAddress: string;
  account: string;
  amount: string;
}

const { PRIVATE_KEY } = process.env;

async function mintTokens(args: MintTaskArgs, provider: JsonRpcProvider) {
  if (!PRIVATE_KEY) {
    throw new Error("Error: no private key set in .env");
  }
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const token = MockERC20__factory.connect(args.tokenAddress, provider);

  const decimals = await token.decimals();
  const modifer = 10 ^ decimals;
  await token
    .connect(wallet)
    .mint(args.account, BigNumber.from(args.amount).mul(modifer));
}

export default task("mint", "mints tokens to an account")
  .addParam("token", "ERC20 token address")
  .addParam("account", "account to recieve tokens")
  .setAction(async (taskArgs: MintTaskArgs) =>
    mintTokens(taskArgs, hEthers.provider),
  );
