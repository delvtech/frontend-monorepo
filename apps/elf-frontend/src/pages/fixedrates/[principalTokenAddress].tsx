import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import {
  getAllPrincipalTokenAddresses,
  getOpenPrincipalTokensWithSameBaseAsset,
} from "elf/tranche/tranches";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ReactElement } from "react";
import { getTokenInfo } from "tokenlists/tokenlists";
import { BuyFixedRatesViewProps } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesView";
import { BuyFixedRatesViewWithZap } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesViewWithZap";

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<BuyFixedRatesViewProps>
> {
  // Used for the Term picker, since base assets can have multiple terms (ie:
  // principal tokens) running at the same time.
  const availablePrincipalTokens = getOpenPrincipalTokensWithSameBaseAsset(
    params?.principalTokenAddress as string,
  );
  const principalTokenInfo = getTokenInfo<PrincipalTokenInfo>(
    params?.principalTokenAddress as string,
  );
  const principalTokenPoolInfo = getPoolInfoForPrincipalToken(
    params?.principalTokenAddress as string,
  );
  return {
    props: {
      availablePrincipalTokens,
      principalTokenInfo,
      principalTokenPoolInfo,
      principalTokenAddress: params?.principalTokenAddress as
        | string
        | undefined,
    },
  };
}

export default function BuyFixedRates(
  props: BuyFixedRatesViewProps,
): ReactElement | null {
  return BuyFixedRatesViewWithZap(props);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const addresses = getAllPrincipalTokenAddresses();
  const paths = addresses.map((principalTokenAddress) => ({
    params: { principalTokenAddress },
  }));
  return {
    paths,
    fallback: false,
  };
}
