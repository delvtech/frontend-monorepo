const YEARN_VAULT_APYS_URL = "https://api.yearn.finance/v1/chains/1/vaults/all";
export async function fetchYearnVaults(): Promise<YearnVaultResult[]> {
  const result = await fetch(YEARN_VAULT_APYS_URL);

  const resultJSON = (await result.json()) as YearnVaultResult[];

  return resultJSON;
}

export function getYearnVaultAPY(
  apyFromYearn: YearnVaultResult["apy"],
): number {
  const { net_apy } = apyFromYearn;
  return net_apy;
}

export interface YearnVaultResult {
  address: string;
  symbol: string;
  apy: {
    points: { inception: number; month_ago: number; week_ago: number } | null;
    gross_apr: number;
    net_apy: number;
  };
  endorsed: boolean;
  tvl: {
    totalAssets: number;
    value: string;
    price: number;
  };
  name: string;
  display_name: string;
  updated: number;
  fees: {
    special: Record<string, number>;
    general: {
      managementFee: number;
      performanceFee: number;
    };
  };
  token: {
    name: string;
    icon: string;
    symbol: string;
    address: string;
    displayName: string;
    decimals: number;
  };
  decimals: number;
  emergencyShutdown: boolean;
  tags: string[];
  type: string;
}
