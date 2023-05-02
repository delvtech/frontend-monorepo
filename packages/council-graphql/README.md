# Council GraphQL

A package designed to be used with [@elementfi/graphql](https://github.com/delv-tech/frontend-monorepo/tree/main/packages/graphql) to interact with the [Council](https://github.com/delv-tech/council) contracts using GraphQL.

## TODO

- [ ] Implement Dataloaders
- [x] Separate business logic and data access (storage) layers
- [ ] Measure efficiency gains from switching to GraphQL (+DataLoaders)
  - [ ] Alchemy request volume
  - [ ] Page data load time
    - [ ] Initial
    - [ ] Navigating

## Notes

### CoreVoting

- holds the proposals
- allows you to create a proposal
- maintains a whitelist of approved voting vaults
- Has events for seeing the list of votes (voting power + ballot) that have been cast)
- has vote(votingVaults[], proposalId) method

### GSCVoting

- holds the proposals that gsc votes on
- allows you to create a proposal
- has a single approved voting vault, aka LockingVault
- Has events for seeing the list of votes (voting power + ballot) that have been cast)
- has vote(votingVaults[], proposalId) method

### VotingVault

(ie: LockingVault, VestingVault)

- allows you to deposit your ELFI token, giving you voting power in the vault
- can define the behavior for calculating how much voting power the depositer into the vault receives
  - eg, LockingVault defines delegation capabilities, where 1 ELFI = 1 Vote power
  - eg, VestingVault defines delegation too, but 1 ELFI = 0.25 VP

### Challenges

Unlike data from a database, not every entity has a guid. For example, proposals are only retrievable using a combination of the voting contract's guid (address) and the proposals id (only unique in the context of the single voting contract)

Some relationships are harder to determine efficiently leading to the inclusion of some fields on types that wouldn't normally be included (e.g., including the `VotingContract` field on the `Proposal` type)

**Example problem:** Get a Voter's Voting Power for a specific Proposal.

In a typical relational db, I might have a `voting_powers` table, a `proposals` table, and a `voting_contracts_vaults` joining table. This would allow me get the voting power using only the proposal id and voter address.

```sql
SELECT proposals.id AS proposal_id,
       voting_powers.voter_address AS voter,
       SUM(voting_powers.power) AS voting_power
  FROM proposals
  JOIN voting_contracts_vaults
    ON voting_contracts_vaults.voting_contract_id = proposals.voting_contract_id
  JOIN voting_powers
    ON voting_powers.vault_id = voting_contracts_vaults.vault_id
 WHERE voting_powers.voter_address = "0x00"
   AND proposals.id = 1
```

This would result in a row with the proposal id, voter's address, and the aggregated voting power from all vaults the proposal's voting contract uses.

_This also ignores the added complexity of stale block lag._

With the contracts:

- There's no proposals table where each proposal has a guid.
- There's no joining table to look up which vaults are being used by which contracts.

So, along with the proposal id and voter address, I also need to have the voting contract id (address) to scope the proposal id and I have to maintain a mapping of contracts to vaults in the business logic.

### Code Organization

| Folder Name    | Purpose                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datasources`  | Prep data sources (e.g., contracts, APIs), make it easier to use them, and eventually implement [dataloaders](https://github.com/graphql/dataloader) to cache and batch calls to them. |
| `logic`        | Hold business logic.                                                                                                                                                                   |
| `logic/models` | Map types to business logic and data source calls.                                                                                                                                     |
| `logic/utils`  | Reusable business logic for models.                                                                                                                                                    |
| `resolvers`    | Create context and map GraphQL fields and arguments to model calls                                                                                                                     |
| `generated`    | Generated types from `.graphql` files.                                                                                                                                                 |

### Emerging SDK

The logic and data sources are shaping up to be a stand alone SDK which is only tied to GraphQL by the generated types. A separate set of types could be created to completely separate the SDK from the GraphQL API.
