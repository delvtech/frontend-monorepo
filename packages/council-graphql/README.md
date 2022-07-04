# Council GraphQL

An Element Finance GraphQL package designed to be used with [@elementfi/graphql](https://github.com/element-fi/frontend-monorepo/tree/main/packages/graphql) to interact with the [Council](https://github.com/element-fi/council) contracts using GraphQL.

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
