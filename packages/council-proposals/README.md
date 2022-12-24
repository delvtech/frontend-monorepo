# council-proposals

Our mapping of on-chain and off-chain proposals.

## Instructions

- Setup `.env` with Alchemy API keys.

- Scape proposal information from snapshot and commonwealth

```bash
yarn workspace @elementfi council-proposals scrape:all

```

- Build source and proposal json files

```bash
yarn workspace @elementfi/council-proposals build
```

- Push new files to AWS S3
- See AWS section for setup

```bash
yarn workspace @elementfi/council-proposals push-to-s3
```

## AWS Setup

- Download the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Create configuration files using this [guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html). We need `credentials` and `config` files.
