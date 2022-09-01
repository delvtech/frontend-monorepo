import { Provider } from "@ethersproject/providers";
import { TokenInfo, TokenList } from "@uniswap/token-lists";
import { AddressesJsonFile } from "./addresses/AddressesJsonFile";
import { tags, TokenTag } from "./tags";
import {
  ERC20Forwarder__factory,
  ForwarderFactory__factory,
  MockPool__factory,
  MockYieldAdapter__factory,
} from "@elementfi/core-v2-typechain";
import { PrincipalPoolTokenInfo, PrincipalTokenInfo } from "./types";
import { ethers } from "ethers";
import { TransferSingleEvent } from "@elementfi/core-v2-typechain/dist/contracts/Pool";
import { getERC20Info } from "./erc20";

export async function getTokenList(
  provider: Provider,
  addressesJson: AddressesJsonFile,
  name: string,
): Promise<TokenList> {
  const {
    chainId,
    addresses: {
      forwarderFactory,
      usdcToken,
      daiToken,
      wethToken,
      usdcPool: usdcMultiPool,
      daiPool: daiMultiPool,
      wethPool: wethMultiPool,
      lpUSDC_30Token,
      lpUSDC_60Token,
      lpUSDC_90Token,
      lpDAI_30Token,
      lpDAI_60Token,
      lpDAI_90Token,
      lpWETH_30Token,
      lpWETH_60Token,
      lpWETH_90Token,
    },
  } = addressesJson;

  console.log(`Building: ${name}`);

  const baseAssets = [usdcToken, daiToken, wethToken];
  const multiPools = [usdcMultiPool, daiMultiPool, wethMultiPool];

  // This is because we don't have a pool initiated event to identify which
  // pools have been created.
  const lpTokensByMultiPool = {
    [usdcMultiPool]: [lpUSDC_30Token, lpUSDC_60Token, lpUSDC_90Token],
    [daiMultiPool]: [lpDAI_30Token, lpDAI_60Token, lpDAI_90Token],
    [wethMultiPool]: [lpWETH_30Token, lpWETH_60Token, lpWETH_90Token],
  };

  const baseAssetTokenInfos: TokenInfo[] = [];
  const principalTokenInfos: PrincipalTokenInfo[] = [];
  const principalPoolTokenInfos: PrincipalPoolTokenInfo[] = [];

  for (const address of baseAssets) {
    baseAssetTokenInfos.push(await getERC20Info(provider, chainId, address));
  }

  for (const multiPoolAddress of multiPools) {
    // TODO: May have to be a Pool/MockPool depending on chainId
    const multiPoolContract = MockPool__factory.connect(
      multiPoolAddress,
      provider,
    );

    const multiTermAddress = await multiPoolContract.term();
    const underlyingAddress = await multiPoolContract.token();

    // TODO: May have to be a Term/MockYieldAdapter depending on chainId
    const multiTermContract = MockYieldAdapter__factory.connect(
      multiTermAddress,
      provider,
    );

    const createdAtAndExpiryTimestamps: {
      expiryTimestamp: number;
      createdAtTimestamp: number;
    }[] = [];

    // TODO: A "PoolInitiated" event will be added to the Pool.sol (MultiPool)
    // which will be used to get these.
    for (const lpTokenAddress of lpTokensByMultiPool[multiPoolAddress]) {
      const erc20ForwarderContract = ERC20Forwarder__factory.connect(
        lpTokenAddress,
        provider,
      );

      const poolId = await erc20ForwarderContract.tokenId();

      // for now this is going through transfer events to look for the first
      // event created with the poolId.
      const transferEventFilter = multiPoolContract.filters.TransferSingle(
        null,
        ethers.constants.AddressZero, // _mint function comes from AddressZero
      );
      const transferEvents = await multiPoolContract.queryFilter(
        transferEventFilter,
      );
      const firstTransferEvent = transferEvents.find(({ args }) =>
        args.id.eq(poolId),
      ) as TransferSingleEvent; // safe to cast since this poolId wouldn't exist without it
      const mintBlock = await provider.getBlock(firstTransferEvent.blockNumber);

      createdAtAndExpiryTimestamps.push({
        // expiry, poolId, and tokenId are all the same
        expiryTimestamp: poolId.toNumber(),
        createdAtTimestamp: mintBlock.timestamp,
      });
    }

    for (const {
      createdAtTimestamp,
      expiryTimestamp,
    } of createdAtAndExpiryTimestamps) {
      const forwarderFactoryContract = ForwarderFactory__factory.connect(
        forwarderFactory,
        provider,
      );

      const principalTokenAddress = await forwarderFactoryContract.getForwarder(
        multiTermAddress,
        expiryTimestamp,
      );

      principalTokenInfos.push({
        address: principalTokenAddress,
        chainId,
        decimals: await multiTermContract.decimals(),
        name: await multiTermContract.name(expiryTimestamp),
        symbol: await multiTermContract.symbol(expiryTimestamp),
        tags: [TokenTag.PRINCIPAL],
        extensions: {
          underlying: underlyingAddress,
          position: await multiTermContract.vault(),
          createdAtTimestamp,
          expiryTimestamp,
          multiTerm: multiTermAddress,
          tokenId: expiryTimestamp,
        },
      });

      principalPoolTokenInfos.push({
        address: await forwarderFactoryContract.getForwarder(
          multiPoolAddress,
          expiryTimestamp,
        ),
        chainId,
        decimals: await multiPoolContract.decimals(),
        name: await multiPoolContract.name(expiryTimestamp),
        symbol: await multiPoolContract.symbol(expiryTimestamp),
        tags: [TokenTag.POOL],
        extensions: {
          principalToken: principalTokenAddress,
          underlying: underlyingAddress,
          createdAtTimestamp,
          expiryTimestamp,
          multiPool: multiPoolAddress,
          poolId: expiryTimestamp,
        },
      });
    }
  }

  const tokenList: TokenList = {
    name,
    logoURI: "https://elementfi.s3.us-east-2.amazonaws.com/logo.svg",
    tags,
    timestamp: new Date().toISOString(),
    version: {
      major: 0,
      minor: 0,
      patch: 0,
    },
    tokens: [
      ...baseAssetTokenInfos,
      ...principalTokenInfos,
      ...principalPoolTokenInfos,
    ],
  };

  console.log("done!");

  return tokenList;
}
