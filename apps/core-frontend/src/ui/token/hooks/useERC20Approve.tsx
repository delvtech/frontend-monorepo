import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { matchSmartContractReadCallQuery } from "ui/contracts/matchSmartContractReadCallQuery/matchSmartContractReadCallQuery";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import {
  BigNumberish,
  ContractReceipt,
  ethers,
  Overrides,
  Signer,
} from "ethers";
import { useCallback } from "react";
import { UseMutationResult, useQueryClient } from "react-query";

interface UseERC20Approve {
  onApproveClick: () => void;
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    [account: string, amount: BigNumberish, overrides?: Overrides | undefined],
    unknown
  >;
}
export function useERC20Approve(
  baseAssetContract: ERC20 | undefined,
  signer: Signer | undefined,
  owner: string | null | undefined,
  spender: string | null | undefined,
): UseERC20Approve {
  const queryClient = useQueryClient();
  const mutationResult = useSmartContractTransactionPersisted(
    baseAssetContract,
    "approve",
    signer,
    {
      onTransactionMined: () => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const match = matchSmartContractReadCallQuery(
              query,
              baseAssetContract?.address,
              "allowance",
              [owner as string, spender as string],
            );
            return match;
          },
        });
      },
    },
  );

  const { mutate: approve } = mutationResult;

  const onApproveClick = useCallback(() => {
    if (spender) {
      approve([spender, ethers.constants.MaxUint256]);
    }
  }, [approve, spender]);
  return { onApproveClick, mutationResult };
}
