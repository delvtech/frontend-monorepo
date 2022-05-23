export interface AddressesJsonFile {
  chainId: number;
  addresses: {
    balancerVaultAddress: string;
    trancheFactoryAddress: string;
    crv3cryptoAddress: string;
    interestTokenFactoryAddress: string;
    weightedPoolFactoryAddress: string;
    convergentPoolFactoryAddress: string;
    userProxyContractAddress: string;
    wethAddress: string;
    daiAddress: string;
    usdcAddress: string;
    stecrvAddress: string;
    wbtcAddress: string;
    "alusd3crv-fAddress": string;
    "lusd3crv-fAddress": string;
    "mim-3lp3crv-fAddress": string;
    eurscrvAddress: string;
    crvtricryptoAddress: string;
  };
  safelist: string[];
}
