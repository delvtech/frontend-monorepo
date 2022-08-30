export interface TagInfo {
  name: string;
  description: string;
}

export enum TokenTag {
  CCPOOL = "ccpool",
  PRINCIPAL = "eP",
  YIELD = "eY",
}

export const tags: Record<TokenTag, TagInfo> = {
  [TokenTag.PRINCIPAL]: {
    name: "Principal token",
    description:
      "Token that represents a deposit of principal into a yield position",
  },
  [TokenTag.YIELD]: {
    name: "Yield token",
    description:
      "Token that represents the yield on a deposit into a yield position",
  },
  [TokenTag.CCPOOL]: {
    name: "ConvergentCurve pool",
    description: "Token that represents the balancer pool for Principal tokens",
  },
};
