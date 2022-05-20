import { SonraFetch, z, zx } from "sonra";
import { buildBaseTokenInfo } from "./baseToken";
import {
  balancerVaultAddress,
  ccPoolFactoryV1Address,
  ccPoolFactoryV1_1Address,
  trancheFactoryAddress
} from "./constants";
import { buildConvergentCurvePoolV1Info, buildConvergentCurvePoolV1_1Info } from "./convergentCurvePool";
import { buildPrincipalTokenInfo } from "./principalToken";
import { buildTrancheAndPoolEventInfo } from "./trancheAndPool";
import { log } from "./utils";
import { buildWrappedPositionInfo } from "./wrappedPosition";
import { buildYearnVaultInfo } from "./yearnVault";
import { buildYieldTokenInfo } from "./yieldToken";
import { buildYVaultAssetProxyInfo } from "./yVaultAssetProxy";

const termSchema = z.object({
  start: z.date(),
  end: z.date(),
  duration: z.number(),
});

const convergentCurvePoolSchema = z.object({
  poolId: z.string(),
  underlying: zx.address().category("baseToken"),
  governance: zx.address(),
  bond: zx.address().category("principalToken"),
  term: termSchema,
});

const convergentCurvePoolSchemaFees = z.object({
  feesUnderlying: zx.bignumber(),
  feesBond: zx.bignumber(),
  percentFee: zx.bignumber(),
  percentFeeGov: zx.bignumber(),
});

export const elementModel = {
  balancerVault: z.object({}),
  trancheFactory: z.object({}),

  convergentCurvePoolFactoryV1: z.object({}),
  convergentCurvePoolFactoryV1_1: z.object({}),

  convergentCurvePoolV1: convergentCurvePoolSchema.extend({
    factory: zx.address().category("convergentCurvePoolFactoryV1"),
    fees: convergentCurvePoolSchemaFees,
  }),
  convergentCurvePoolV1_1: convergentCurvePoolSchema.extend({
    factory: zx.address().category("convergentCurvePoolFactoryV1_1"),
    fees: convergentCurvePoolSchemaFees.extend({
      governanceFeesUnderlying: zx.bignumber(),
      governanceFeesBond: zx.bignumber(),
    }),
  }),

  baseToken: zx.erc20().extend({
    totalSupply: zx.bignumber(),
  }),

  yieldToken: zx.erc20().extend({
    underlying: zx.address().category("baseToken"),
    tranche: zx.address().category("principalToken"),
    term: termSchema,
  }),
  yearnVault: zx.erc20().extend({
    totalSupply: zx.bignumber(),
    pricePerShare: zx.bignumber(),
    apiVersion: z.string(),
    governance: zx.address(),
    totalAssets: zx.bignumber(),
  }),
  yVaultAssetProxy: z.object({
    vault: zx.address().category("yearnVault"),
  }),
  wrappedPosition: zx.erc20().extend({
    token: zx.address(),
    tranches: zx.address().category("principalToken").array(),
  }),

  principalToken: zx.erc20().extend({
    underlying: zx.address().category("baseToken"),
    interestToken: zx.address().category("yieldToken"),
    position: zx.address().category("wrappedPosition"),
    term: termSchema,
  }),
} as const;

export type ElementModel = typeof elementModel;

export const elementFetch: SonraFetch<ElementModel> = async () => {
  log("Started fetching element data...");

  const { convergentCurvePoolCreatedEvents, trancheCreatedEvents } =
    await buildTrancheAndPoolEventInfo();

  const [
    principalTokenInfo,
    convergentCurvePoolV1Info,
    convergentCurvePoolV1_1Info
  ] = await Promise.all([
    buildPrincipalTokenInfo(trancheCreatedEvents),
    buildConvergentCurvePoolV1Info(convergentCurvePoolCreatedEvents),
    buildConvergentCurvePoolV1_1Info(convergentCurvePoolCreatedEvents),
  ]);

  const [baseTokenInfo, yieldTokenInfo, wrappedPosition] = await Promise.all([
    buildBaseTokenInfo(principalTokenInfo),
    buildYieldTokenInfo(principalTokenInfo),
    buildWrappedPositionInfo(principalTokenInfo),
  ]);

  const yVaultAssetProxyInfo = await buildYVaultAssetProxyInfo(wrappedPosition);
  const yearnVaultInfo = await buildYearnVaultInfo(yVaultAssetProxyInfo);

  log("Finished fetching element data...");

  return {
    addresses: {
      balancerVault: [balancerVaultAddress],
      trancheFactory: [trancheFactoryAddress],

      convergentCurvePoolFactoryV1: [ccPoolFactoryV1Address],
      convergentCurvePoolFactoryV1_1: [ccPoolFactoryV1_1Address],
      convergentCurvePoolV1: convergentCurvePoolV1Info.addresses,
      convergentCurvePoolV1_1: convergentCurvePoolV1_1Info.addresses,

      baseToken: baseTokenInfo.addresses,
      principalToken: principalTokenInfo.addresses,
      yieldToken: yieldTokenInfo.addresses,
      wrappedPosition: wrappedPosition.addresses,
      yVaultAssetProxy: yVaultAssetProxyInfo.addresses,
      yearnVault: yearnVaultInfo.addresses,
    },
    contracts: {
      balancerVault: "Vault.sol",
      trancheFactory: "TrancheFactory.sol",

      convergentCurvePoolFactoryV1: "ConvergentPoolFactory.sol",
      convergentCurvePoolFactoryV1_1: "ConvergentPoolFactory.sol",
      convergentCurvePoolV1: "ConvergentCurvePoolV1.sol",
      convergentCurvePoolV1_1: "ConvergentCurvePool.sol",

      baseToken: "ERC20.sol",
      principalToken: "Tranche.sol",
      yieldToken: "InterestToken.sol",
      wrappedPosition: "WrappedPosition.sol",
      yVaultAssetProxy: "YVaultAssetProxy.sol",
      yearnVault: "IYearnVault.sol",
    },
    metadata: {
      balancerVault: {},
      trancheFactory: {},

      convergentCurvePoolFactoryV1: {},
      convergentCurvePoolFactoryV1_1: {},
      convergentCurvePoolV1: convergentCurvePoolV1Info.metadata,
      convergentCurvePoolV1_1: convergentCurvePoolV1_1Info.metadata,

      baseToken: baseTokenInfo.metadata,
      principalToken: principalTokenInfo.metadata,
      yieldToken: yieldTokenInfo.metadata,
      wrappedPosition: wrappedPosition.metadata,
      yVaultAssetProxy: yVaultAssetProxyInfo.metadata,
      yearnVault: yearnVaultInfo.metadata,
    },
  };
};
