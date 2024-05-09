import testnetProposals from "proposals/json/testnet.proposals";
import testnetGscProposals from "proposals/json/testnet-gsc.proposals";
import goerliProposals from "proposals/json/goerli.proposals";
import goerliGscProposals from "proposals/json/goerli-gsc.proposals";
import mainnetProposals from "./proposals/json/mainnet.proposals.json";
import mainnetGscProposals from "./proposals/json/mainnet-gsc.proposals.json";
export interface Proposal {
    /**
     * A hash of the targets and calldatas for the proposal
     */
    proposalHash: string;
    /**
     * The nonce identifier of the proposal stored in CoreVoting
     */
    proposalId: string;
    /**
     * The block number the proposal was create at
     */
    created: number;
    /**
     * Human-readable title of the proposal.
     */
    title: string;
    /**
     * Human-readable description of the proposal.
     */
    description: string;
    /**
     * Timestamp in seconds of the block the proposal was created in
     */
    createdTimestamp: number;
    /**
     * Block number for last vote
     */
    expiration: number;
    /**
     * Block number for start of execution period
     */
    unlock: number;
    /**
     * Block number for end of execution period
     */
    lastCall: number;
    /**
     * Minimum vote power to pass or reject a proposal. Note: this is a string
     * because quorum can be too large a number for JS can handle.
     */
    quorum: string;
    /**
     * list of addresses the Timelock contract will call when executing a proposal
     */
    targets: string[];
    /**
     * The calldata associated with each target address, must be the same length as targets
     */
    calldatas: string[];
    /**
     * id of the snapshot proposal
     */
    snapshotId: string;
    /**
     * A url to the forum post where the discussion lives, eg:
     * https://forum.website.com/discussion/4631-egp2-increase-gsc-quorum-threshold
     * */
    forumLink: string;
}
export interface ProposalsJson {
    version: "0.0.0";
    snapshotSpace: string;
    proposals: Proposal[];
}
export { testnetProposals, testnetGscProposals, goerliProposals, goerliGscProposals, mainnetProposals, mainnetGscProposals };

//# sourceMappingURL=index.d.ts.map
