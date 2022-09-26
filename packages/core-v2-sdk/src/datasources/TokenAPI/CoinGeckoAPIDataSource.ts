import { HTTPDataSource } from "src/datasources/HTTPDataSource";

export class CoinGeckoAPIDataSource extends HTTPDataSource {
  static baseURL: "https://api.coingecko.com/api/v3/";

  constructor() {
    super("https://api.coingecko.com/api/v3/");
  }

  // TODO: Add strong types for CODE and possibly ID
  async getTokenPrice<ID extends string, CODE extends string>(
    id: ID,
    currency: CODE,
  ): Promise<number> {
    const res = await this.get<Record<ID, Record<CODE, number>>>(
      `/simple/price?ids=${id}&vs_currencies=${currency ?? "usd"}`,
    );
    return res[id]?.[currency] ?? 1;
  }
}
