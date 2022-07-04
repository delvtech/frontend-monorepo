import {
  ProposalsJson,
  Proposal as ProposalInfo,
} from "@elementfi/council-proposals";
import {
  goerliAddressList,
  mainnetAddressList,
} from "@elementfi/council-tokenlist";
import { Proposal, VotingContract } from "src/generated";
import { AddressType } from "src/logic/addresses";
import { getFromBlock } from "src/logic/blockNumbers";
import { CouncilResolverContext } from "src/resolvers/context";

export const ProposalModel = {
  async getByIds(
    ids: string[],
    votingContract: VotingContract,
    context: CouncilResolverContext,
  ): Promise<Proposal[]> {
    const infos = await getInfos(votingContract, context);
    const infosById: Record<string, Partial<ProposalInfo>> = {};
    for (const info of infos) {
      infosById[info.proposalId] = info;
    }

    const idsWithMissingInfo = ids.filter((id) => !infosById[id]);
    if (idsWithMissingInfo.length) {
      const dataSource = getDataSourceByName(
        votingContract.name as AddressType,
        context.dataSources,
      );
      for (const id of idsWithMissingInfo) {
        const { created, expiration, lastCall, quorum, unlock } =
          await dataSource.getProposalById(id);
        infosById[id] = {
          proposalId: id,
          created,
          expiration,
          lastCall,
          quorum,
          unlock,
        };
      }
    }

    return ids.map((id) => {
      const info = infosById[id];
      return {
        id,
        votingContract,
        created: info?.created,
        description: info?.description,
        expiration: info?.expiration,
        isVerified: !!info?.snapshotId,
        lastCall: info?.lastCall,
        quorum: info?.quorum,
        title: info?.title,
        unlock: info?.unlock,
      };
    });
  },
  async getById(
    id: string,
    votingContract: VotingContract,
    context: CouncilResolverContext,
  ) {
    const proposals = await this.getByIds([id], votingContract, context);
    return proposals[0];
  },
  async getByVotingContract(
    votingContract: VotingContract,
    context: CouncilResolverContext,
  ): Promise<Proposal[]> {
    const dataSource = getDataSourceByName(
      votingContract.name as AddressType,
      context.dataSources,
    );

    if (!dataSource) {
      return [];
    }
    const args = await dataSource.getProposalCreatedEventArgs(
      getFromBlock(context.chainId),
    );
    const ids = args.map(({ proposalId }) => proposalId);
    return this.getByIds(ids, votingContract, context);
  },
};

async function getInfos(
  { name }: VotingContract,
  { chainId, dataSources }: CouncilResolverContext,
): Promise<ProposalInfo[]> {
  let fileName;
  if (name === "coreVoting") {
    fileName = getInfoFileName(chainId);
  } else if (name === "gscCoreVoting") {
    fileName = getGSCInfoFileName(chainId);
  }

  if (!fileName) {
    return [];
  }

  const json: ProposalsJson = await dataSources.elementS3.getFile(
    fileName,
    "json",
  );
  return json.proposals;
}

function getInfoFileName(chainId: number) {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return "mainnet.proposals.json";
    case goerliAddressList.chainId:
      return "goerli.proposals.json";
    default:
      "testnet.proposals.json";
  }
}

function getGSCInfoFileName(chainId: number) {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return "mainnet-gsc.proposals.json";
    case goerliAddressList.chainId:
      return "goerli-gsc.proposals.json";
    default:
      "testnet-gsc.proposals.json";
  }
}

function getDataSourceByName(
  name: AddressType,
  dataSources: CouncilResolverContext["dataSources"],
) {
  switch (name) {
    case "gscCoreVoting":
      return dataSources.gscVoting;
    case "coreVoting":
    default:
      return dataSources.coreVoting;
  }
}
