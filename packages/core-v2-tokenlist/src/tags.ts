export interface TagInfo {
  name: string;
  description: string;
}

export enum TokenTag {
  POOL = "pool",
  PRINCIPAL = "principalToken",
}

export const tags: Record<TokenTag, TagInfo> = {
  [TokenTag.POOL]: {
    name: "LP Pool",
    description: "Token that represents the pool for Principal tokens",
  },
  [TokenTag.PRINCIPAL]: {
    name: "Principal Token",
    description:
      "Token that represents a deposit of principal into a yield position",
  },
};
