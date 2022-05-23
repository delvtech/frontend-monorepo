import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { ERC20__factory } from "src/types/factories/ERC20__factory";

enum ContractLanguage {
  Solidity,
  Vyper,
}

interface TokenDescription {
  address: string;
  name: string;
  lang?: ContractLanguage; // By default we assume ContractLanguage.Solidity in consumer function
}

const tokens: TokenDescription[] = [
  {
    name: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    name: "STETH",
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
  },
  {
    name: "3CRV",
    address: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
    lang: ContractLanguage.Vyper,
  },
  {
    name: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    name: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    name: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  {
    name: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  {
    name: "LUSD",
    address: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
  },
];

// findBalancesSlot works by iterating across the first 100 slots for a given
// contract address. Notwithstanding a minute difference in mapping
// construction in solidity versus vyper contract, it works in each case by
// updating a potential balance slot, checking the balance for the test address
// (the zero address), and then seeing if matches. After each check, the slot is
// reset to its original value
async function findBalancesSlot(
  address: string,
  lang: ContractLanguage,
  provider: JsonRpcProvider,
): Promise<number> {
  const account = ethers.constants.AddressZero;
  const probeA = ethers.utils.defaultAbiCoder.encode(["uint"], [1]);
  const probeB = ethers.utils.defaultAbiCoder.encode(["uint"], [2]);

  const token = ERC20__factory.connect(address, provider);

  for (let i = 0; i < 100; i++) {
    let probedSlot = ethers.utils.keccak256(
      lang === ContractLanguage.Solidity
        ? ethers.utils.defaultAbiCoder.encode(["address", "uint"], [account, i])
        : ethers.utils.defaultAbiCoder.encode(
            ["uint", "address"],
            [i, account],
          ),
    );

    if (probedSlot.startsWith("0x0")) {
      probedSlot = `0x${probedSlot.slice(3)}`;
    }

    const prev = await provider.send("eth_getStorageAt", [
      address,
      probedSlot,
      "latest",
    ]);

    const probe = prev === probeA ? probeB : probeA;

    await provider.send("hardhat_setStorageAt", [address, probedSlot, probe]);

    const balance = await token.balanceOf(account);

    await provider.send("hardhat_setStorageAt", [address, probedSlot, prev]);

    if (balance.eq(ethers.BigNumber.from(probe))) {
      return i;
    }
  }
  throw new Error("Balances slot not found!");
}

const AMOUNT = "10000";

export default async function manipulateTokenBalances(
  recipient: string,
  provider: JsonRpcProvider,
): Promise<void> {
  await Promise.all(
    tokens.map(
      async ({
        //name,
        address,
        lang = ContractLanguage.Solidity,
      }) => {
        const slot = await findBalancesSlot(address, lang, provider);
        const token = ERC20__factory.connect(address, provider);

        const index = ethers.utils.solidityKeccak256(
          ["uint256", "uint256"],
          lang === ContractLanguage.Solidity
            ? [recipient, slot]
            : [slot, recipient],
        );

        const decimals = await token.decimals();
        const adjustedAmount = ethers.utils.parseUnits(AMOUNT, decimals);

        await provider.send("hardhat_setStorageAt", [
          address,
          index,
          ethers.utils.defaultAbiCoder.encode(["uint"], [adjustedAmount]),
        ]);
      },
    ),
  );
}
