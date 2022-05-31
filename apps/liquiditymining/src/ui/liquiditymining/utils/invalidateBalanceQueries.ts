import { matchSmartContractReadCallQuery } from "@elementfi/react-query-typechain/src/utils/matchSmartContractReadCallQuery/matchSmartContractReadCallQuery";
import { BigNumberish } from "ethers";
import { poolIdsByPoolAddress } from "src/elf/liquiditymining/eligiblepools";
import { masterChef } from "src/elf/liquiditymining/masterChef";
import { queryClient } from "src/elf/queryClient";

export function invalidateBalanceQueries(
  poolId: BigNumberish,
  account: string,
): void {
  const [poolAddress] = Object.entries(poolIdsByPoolAddress).find(
    ([_, pid]) => pid === poolId,
  ) || [""];
  queryClient.invalidateQueries({
    predicate: (query) =>
      matchSmartContractReadCallQuery(query, masterChef.address, "userInfo", [
        poolId,
        account,
      ]) ||
      matchSmartContractReadCallQuery(
        query,
        masterChef.address,
        "pendingSushi",
        [poolId, account],
      ) ||
      matchSmartContractReadCallQuery(query, poolAddress, "balanceOf", [
        account,
      ]) ||
      matchSmartContractReadCallQuery(query, poolAddress, "balanceOf", [
        masterChef.address,
      ]),
  });
}
