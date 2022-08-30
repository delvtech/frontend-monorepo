import {
  ERC20Forwarder__factory,
  MockYieldAdapter__factory,
} from "@elementfi/core-v2-typechain";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/CompoundV3Term";
import { Provider } from "@ethersproject/providers";
import { TokenTag } from "./tags";
import { PrincipalTokenInfo } from "./types";

export async function getPrincipalTokenInfo(
  provider: Provider,
  chainId: number,
  address: string,
): Promise<PrincipalTokenInfo> {
  const erc20Forwarder = ERC20Forwarder__factory.connect(address, provider);
  const termAddress = await erc20Forwarder.token();

  // TODO: Term__factory doesn't have a vault() method?
  const term = MockYieldAdapter__factory.connect(termAddress, provider);

  const tokenId = await erc20Forwarder.tokenId();

  // TODO: Is this the right way to get the createdAtTimestamp?
  const transferFilter = term.filters.TransferSingle();
  const transferEvents = await term.queryFilter(transferFilter);
  const firstTransferEvent = transferEvents.find(({ args }) =>
    args.id.eq(tokenId),
  ) as TransferSingleEvent;
  const mintBlock = await provider.getBlock(firstTransferEvent.blockNumber);

  // TODO: How do I get the "interestToken" extension field?

  return {
    address,
    chainId,
    decimals: await erc20Forwarder.decimals(),
    name: await erc20Forwarder.name(),
    symbol: await erc20Forwarder.symbol(),
    tags: [TokenTag.PRINCIPAL],
    extensions: {
      underlying: await term.token(),
      createdAtTimestamp: mintBlock.timestamp,
      unlockTimestamp: tokenId.toNumber(),
      position: await term.vault(),
    },
  };
}
