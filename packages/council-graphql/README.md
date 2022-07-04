# Council GraphQL

## TODO

- Implement Dataloaders
- Separate business logic and data access (storage) layers

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
