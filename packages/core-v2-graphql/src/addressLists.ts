import { ChainId } from "@elementfi/base";

export const goerliAddressList = {
  addresses: {
    forwarderFactory: "0xe6ea3f63c99ec2d32ffaa1265b85ccb2adbdc374",
    usdcToken: "0x544d6a84bfc818220c2eeadd7ad3ca831d032808",
    daiToken: "0xd7c890349c40a77bf5c5176b48b418b87b60dda9",
    wethToken: "0x8186cfa19589498af755a6aad2da75c1120f7a47",
    yvUSDCToken: "0xd1eda2c4213d9c63a6f48ee5fdb23b7991ad90a9",
    yvDAI: "0xd716afa8426bc64c537848b7624891e369fe1705",
    yvWETH: "0x0396551b4436f49bc9e4274c1bf17002323d0c7f",
    USDCTerm: "0x830f3ee9f5f5376e40f26b7055828f7a3733fc6f",
    DAITerm: "0x31bce31ec9095547116f3ce4aec411509265104d",
    WETHTerm: "0x269f8ca2e878765e2ecdc15169d762550a77c881",
    usdcPool: "0x86b3d49e1e3b07c37e11d74d4c108814d9616a89",
    daiPool: "0x6cd7dec64640f3d9f4f1e508ddde764fc3111e52",
    wethPool: "0x4ef14a824476d327df1750eda85650a57fb74d28",
    pUSDC_30Token: "0x13f95e81304039588beadb34488f2b56de26835b",
    pUSDC_60Token: "0xbe5e3d7b20de52cd59610f5abd7da4fa836e3c86",
    pUSDC_90Token: "0xf5eba649ae2ea7cab173202bcc5adcdfaf6feacb",
    pDAI_30Token: "0xc271d1bc9152d02983260bde44cc114cae044f63",
    pDAI_60Token: "0xf58938fc5fc8916c4e605c203ad143116d307652",
    pDAI_90Token: "0x96d2366b325b572c880d2338b09ecad90f3b8a61",
    pWETH_30Token: "0x6e3e63f03bc729b118360a8f25dc68d17444b2c6",
    pWETH_60Token: "0x048b771929d4e23ff3b94cc9958557764e4132a0",
    pWETH_90Token: "0xa23099d276be7be065c2d0afdd4d82cfd268787e",
    lpUSDC_30Token: "0xb708cdd716e1aa065da8f3df0072caf262ea2ba4",
    lpUSDC_60Token: "0xccac555f2689faa7b7e1474b9161285114b97d11",
    lpUSDC_90Token: "0xbd95432d442265a84cd12228734ba0895e5a9284",
    lpDAI_30Token: "0xc663c1ec1143beb9390f5e32e694c75013a132c4",
    lpDAI_60Token: "0xa2a0c6a5da00c85a623dd79b0c727309f7f00b8f",
    lpDAI_90Token: "0x9dbc2f8bbc50b8ffc89336893de885c8d8f7dcbe",
    lpWETH_30Token: "0xc96d5836ffd15c05f962c2e70f561931769dab13",
    lpWETH_60Token: "0xbfc7809a7c8ed2754b9640e976e10713c6c783c2",
    lpWETH_90Token: "0x3b0cb50e3425e9f74c16bee280f7a26f62ef6e94",
  },
  chainId: 5,
};

export function getAddressList(chainId?: number): {
  addresses: Record<string, string>;
  chainId: number;
} {
  switch (chainId) {
    case ChainId.MAINNET:
    case ChainId.GOERLI:
    case ChainId.LOCAL:
    default:
      return goerliAddressList;
  }
}
