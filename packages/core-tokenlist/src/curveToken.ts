import { TokenInfo } from "@uniswap/token-lists/src";
import { ethers } from "ethers";
import hre from "hardhat";
import fetch from "node-fetch";
import { TokenTag } from "src/tags";
import { ETH_CONSTANT } from "./external";
import { CurveLpTokenInfo } from "./types";

export const provider = hre.ethers.provider;
const etherscanProvider = new ethers.providers.EtherscanProvider(
  1,
  process.env.ETHERSCAN_API_KEY,
);

async function getGauges(): Promise<
  { [k in string]: { swap_token: string; swap: string } } | undefined
> {
  const data = await fetch("https://api.curve.fi/api/getGauges");

  if (!data.ok) {
    return;
  }

  const {
    success,
    data: { gauges },
  } = await data.json();
  if (!success) {
    return;
  }

  return gauges;
}

async function getFactoryV2Pools(): Promise<{ address: string }[] | undefined> {
  const data = await fetch("https://api.curve.fi/api/getFactoryV2Pools");
  if (!data.ok) {
    return;
  }

  const {
    success,
    data: { poolData },
  } = await data.json();
  if (!success) {
    return;
  }

  return poolData;
}

/*
 * This function is used to find a correspondance between a curve lp token and
 * the pool address it corresponds to. In most cases we can find the this
 * correspondance by using the curve pool registry but these are not consistent
 * for all the curve pools and tokens. The older CRV_TRI_CRYPTO pool is not
 * listed and so we must use the getGauges endpoint to find that one. This is
 * explained below
 *
 * getGauges api endpoint
 *
 * The gauge system (see https://dao.curve.fi/gaugeweight) in curve is how curve
 * token inflation rewards are distributed to LP'ers in various pools. We don't
 * care exactly about this only that there is an endpoint which lists the pool
 * information. The returned info contains two items, `swap_token` and `swap`.
 * The `swap_token` is the lp token for that pool and the `swap` key corresponds
 * to the pool address. Knowing the lp token address, we can simply iterate
 * across the list of pool information and match it against the `swap_token`
 * value.
 */
async function getCurvePoolFromTokenAddress(address: string): Promise<string> {
  const CURVE_POOL_REGISTRY = "0x90e00ace148ca3b23ac1bc8c240c2a7dd9c2d7f5";

  const poolRegistry = new ethers.Contract(
    CURVE_POOL_REGISTRY,
    ["function get_pool_from_lp_token(address) view returns (address)"],
    provider,
  );

  const pool = (await poolRegistry.get_pool_from_lp_token(address)) as string;

  if (pool !== ethers.constants.AddressZero) {
    return pool;
  }

  // first try gauge data
  const gaugeData = await getGauges();
  if (gaugeData) {
    const gaugeTokenInfo = Object.values(gaugeData).find(
      ({ swap_token }) => swap_token === address,
    );

    if (gaugeTokenInfo) {
      return gaugeTokenInfo.swap;
    }
  }

  throw new Error(`curve pool address: ${address} could not be found`);
}

export async function getCurveTokenInfo({
  chainId,
  address,
  name,
  symbol,
  decimals,
}: TokenInfo): Promise<CurveLpTokenInfo> {
  if (chainId !== 1) {
    throw new Error("can only retrieve curveToken info for mainnet");
  }

  let pool = await getCurvePoolFromTokenAddress(address);

  const curvePoolAbi = await etherscanProvider.fetch("contract", {
    action: "getabi",
    address: pool,
    post: false,
  });

  const curvePoolContract = new ethers.Contract(pool, curvePoolAbi, provider);

  // example: "add_liquidity(uint256[2],uint256)"
  // where the arity of the first argument is the number of pool assets
  const addLiquidityFuncSig = Object.keys(curvePoolContract.functions).find(
    (k) => k.startsWith("add_liquidity"),
  ) as string;

  // example: "remove_liquidity_one_coin(uint256[2],int128,uint256)"
  const removeLiquidityFuncSig = Object.keys(curvePoolContract.functions).find(
    (k) => k.startsWith("remove_liquidity_one_coin"),
  ) as string;

  /*
   * We need this so that we can build our "poolAssets" definition which can be
   * found in our curveLpToken type. We don't know ahead of time whether a given
   * curve pool address has 2 or 3 tokens being traded on it and so we must
   * validate this. Once knowing the number of coins in a given pool we can
   * fetch those addresses and build the poolAssets array with the correct token
   * addresses at the correct index
   */
  const numCoins = parseInt(
    addLiquidityFuncSig.substring(
      addLiquidityFuncSig.indexOf("[") + 1,
      addLiquidityFuncSig.indexOf("]"),
    ),
  );

  const curvePool = new ethers.Contract(
    pool,
    ["function coins(uint256) view returns (address)"],
    provider,
  );

  const poolAssets = await Promise.all(
    [...Array(numCoins)].map(
      (_, idx) => curvePool.coins(idx) as Promise<string>,
    ),
  );

  // The below logic is intended to replace the use of WETH, the wrapped ether
  // token for the native ETH token. We do this because both of the crvTriCrypto
  // pools that element supports has a wrapper "deposit" contract provided by curve
  // to make it more accessible to users. Otherwise, any time a user wants to use
  // the crvTriCrypto pool with their ETH, the user would have to wrap it first.
  // The deposit wrapper does this automatically. Element inherits this same
  // paradigm and so we identify first the crvTriCrypto pools and replace the
  // pool with the deposit wrapper and the WETH poolAsset with the ETH_CONSTANT
  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const wethIdx = poolAssets.findIndex(
    (poolAssetAddress) => poolAssetAddress === WETH,
  );
  if (wethIdx !== -1) {
    const CRV_TRI_CRYPTO = "0xcA3d75aC011BF5aD07a98d02f18225F9bD9A6BDF";
    const CRV_TRI_CRYPTO_POOL = "0x80466c64868E1ab14a1Ddf27A676C3fcBE638Fe5";
    const CRV_TRI_CRYPTO_DEPOSIT = "0x331aF2E331bd619DefAa5DAc6c038f53FCF9F785";
    if (address === CRV_TRI_CRYPTO && pool === CRV_TRI_CRYPTO_POOL) {
      pool = CRV_TRI_CRYPTO_DEPOSIT;
      poolAssets[wethIdx] = ETH_CONSTANT;
    }

    const CRV_3_CRYPTO = "0xc4AD29ba4B3c580e6D59105FFf484999997675Ff";
    const CRV_3_CRYPTO_POOL = "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46";
    const CRV_3_CRYPTO_DEPOSIT = "0x3993d34e7e99Abf6B6f367309975d1360222D446";
    if (address === CRV_3_CRYPTO && pool === CRV_3_CRYPTO_POOL) {
      pool = CRV_3_CRYPTO_DEPOSIT;
      poolAssets[wethIdx] = ETH_CONSTANT;
    }
  }

  return {
    chainId,
    address,
    name,
    decimals,
    symbol,
    tags: [TokenTag.CURVE],
    extensions: {
      pool,
      poolAssets,
      curveRemoveLiqFnIsUint256:
        removeLiquidityFuncSig ===
        "remove_liquidity_one_coin(uint256,uint256,uint256)",
    },
  };
}
