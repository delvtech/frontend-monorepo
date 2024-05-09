import { BigNumber } from "ethers";

export const DISCORD_URL = "https://discord.gg/pvnUHuAsQ2";
export const TWITTER_URL = "https://twitter.com/Element_DAO";
export const COUNCIL_URL = "https://council.delv.tech/";
export const ELEMENT_GOV_URL = "https://gov.element.fi/";
export const COUNCIL_DOC_URL =
  "https://docs-delv.gitbook.io/element-developer-docs/governance-council/council-protocol-overview";
export const ADDRESS_SCREEN_URL =
  "https://6zqnxzsgja.execute-api.us-east-2.amazonaws.com/screen";
const PINATA_GATEWAY = "https://element-fi.mypinata.cloud/ipfs/";
const NFT_ASSET_PATH = "QmfWdY3eof7qFW4KmmPTvyHSh8J5m5pKRVb2odfmAynm5b/";

export const getTokenAssetURL = (id: BigNumber): string => {
  return `${PINATA_GATEWAY + NFT_ASSET_PATH}/${id.toString()}.png`;
};

export const TOS_URL =
  "https://delv-public.s3.us-east-2.amazonaws.com/delv-terms-of-service.pdf";
export const CC0_URL =
  "https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt";
export const PRIVACY_POLICY_URL =
  "https://delv-public.s3.us-east-2.amazonaws.com/delv-privacy-policy.pdf";

export const WHITELIST_URL =
  "https://delv-public.s3.us-east-2.amazonaws.com/nft/whitelist.json";
