import { SonraFetch, z, zx } from "sonra";
import { buildBaseTokenInfo } from "./baseToken";
import { balancerVaultAddress } from "./constants";
import {
  buildConvergentCurvePoolV1Info,
  buildConvergentCurvePoolV1_1Info,
} from "./convergentCurvePool";
import { buildConvergentCurvePoolFactoryInfo } from "./convergentPoolFactory";
import { buildPrincipalTokenInfo } from "./principalToken";
import { buildTrancheFactoryInfo } from "./trancheFactory";
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
  tranche: zx.address().category("principalToken"),
  term: termSchema,
  factory: zx.address().category("convergentPoolFactory"),
});

const convergentCurvePoolSchemaFees = z.object({
  feesUnderlying: zx.bignumber(),
  feesBond: zx.bignumber(),
  percentFee: zx.bignumber(),
  percentFeeGov: zx.bignumber(),
});

const convergentPoolFactoryEvents = z
  .object({
    convergentCurvePool: zx.address(),
    bond: zx.address(),
    factory: zx.address(),
    blockNumber: z.number(),
    blockTimestamp: z.date(),
  })
  .array();

const trancheFactoryEvents = z
  .object({
    trancheAddress: zx.address(),
    wrappedPositionAddress: zx.address(),
    expiration: z.date(),
    blockNumber: z.number(),
    blockTimestamp: z.date(),
  })
  .array();

export const elementModel = {
  balancerVault: z.object({}),

  trancheFactory: z.object({
    events: trancheFactoryEvents,
    certifiedEvents: trancheFactoryEvents,
    invalidEvents: trancheFactoryEvents,
  }),

  convergentPoolFactory: z.object({
    events: convergentPoolFactoryEvents,
    certifiedEvents: convergentPoolFactoryEvents,
    invalidEvents: convergentPoolFactoryEvents,
    version: z.literal("v1").or(z.literal("v1.1")),
  }),

  convergentCurvePoolV1: convergentCurvePoolSchema.extend({
    fees: convergentCurvePoolSchemaFees,
  }),
  convergentCurvePoolV1_1: convergentCurvePoolSchema.extend({
    fees: convergentCurvePoolSchemaFees.extend({
      governanceFeesUnderlying: zx.bignumber(),
      governanceFeesBond: zx.bignumber(),
    }),
  }),

  baseToken: zx.erc20().extend({
    totalSupply: zx.bignumber(),
    tranches: zx.address().category("principalToken").array(),
  }),

  yieldToken: zx.erc20().extend({
    tranche: zx.address().category("principalToken"),
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
    convergentCurvePool: zx
      .address()
      .category("convergentCurvePoolV1")
      .or(zx.address().category("convergentCurvePoolV1_1")),
    term: termSchema,
  }),
} as const;

export type ElementModel = typeof elementModel;

export const elementFetch: SonraFetch<ElementModel> = async () => {
  log("Started fetching element data...");

  const [convergentPoolFactoryInfo, trancheFactoryInfo] = await Promise.all([
    buildConvergentCurvePoolFactoryInfo(),
    buildTrancheFactoryInfo(),
  ]);

  const [
    principalTokenInfo,
    convergentCurvePoolV1Info,
    convergentCurvePoolV1_1Info,
  ] = await Promise.all([
    buildPrincipalTokenInfo(trancheFactoryInfo, convergentPoolFactoryInfo),
    buildConvergentCurvePoolV1Info(convergentPoolFactoryInfo),
    buildConvergentCurvePoolV1_1Info(convergentPoolFactoryInfo),
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
      trancheFactory: trancheFactoryInfo.addresses,

      convergentPoolFactory: convergentPoolFactoryInfo.addresses,
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

      convergentPoolFactory: "ConvergentPoolFactory.sol",
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

      convergentPoolFactory: convergentPoolFactoryInfo.metadata,
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
