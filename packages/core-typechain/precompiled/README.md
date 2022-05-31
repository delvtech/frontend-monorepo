These are precompiled types that don't need to go through typechain/hardhat or
typescript compilation. They are simply copied over to dist/.

This is temporary hack, since our typechain does not currently run on vyper
contracts (.vy) files, and CRVLUSD is a vyper contract (see:
src/libraries/CRVLUSD.vy).

TODO: Implement typechain + vyper so precompiling is no longer necessary. This
only effects CRVLUSD for now.
