The src/ directory holds the hand-curated Element smart contracts (.sol files) copied over
manually from https://github.com/delv-tech/elf-contracts

They are organized by release version, so that consumers can easily access the
correct typechain class for any given contract they need, past or present.

Example:

```
import { ConvergentCurvePool } from '@elementfi/core-typechain/v1';
import { ConvergentCurvePool as CCPoolV1_1 } from '@elementfi/core-typechain/v1.1';
```
