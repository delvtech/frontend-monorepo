import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetStaticPathsResult,
} from "next";
import { getAllPoolAddresses, getPoolInfo } from "elf/pools/getPoolInfo";

import { PoolView, PoolViewProps } from "ui/pools/PoolView/PoolView";

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<PoolViewProps>> {
  const poolInfo = await getPoolInfo(params?.poolAddress as string);
  return {
    props: { poolInfo },
  };
}

export default PoolView;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const addresses = getAllPoolAddresses();
  const paths = addresses.map((poolAddress) => ({
    params: { poolAddress },
  }));
  return {
    paths,
    fallback: false,
  };
}
