interface CanPerformPoolActions {
  buy: boolean;
  sell: boolean;
  addLiquidity: boolean;
  removeLiquidity: boolean;
}

export interface ConvergentPoolCanPerformActions extends CanPerformPoolActions {
  convergentPoolAddress: string;
}
export interface WeightedPoolCanPerformActions extends CanPerformPoolActions {
  weightedPoolAddress: string;
}

export interface CanPerformTrancheActions {
  trancheAddress: string;
  mint: boolean;
  withdrawPrincipal: boolean;
  withdrawInterest: boolean;
}

export interface CanPerformJsonFile {
  chainId: number;
  description: string;
  canPerform: {
    tranches: CanPerformTrancheActions[];
    convergentPools: ConvergentPoolCanPerformActions[];
    weightedPools: WeightedPoolCanPerformActions[];
  };
}
