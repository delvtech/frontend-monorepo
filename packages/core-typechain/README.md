# elf-contracts-typechain

Typechain codegen for generating Typescript classes and types for elf-contracts

## Install

Run

```bash
npm install @elementfi/core-typechain
```

## Development

Run

```
npm ci
```

This will run the build process constructing dist/ in the postinstall phase

Make changes or add new contracts in the `src/localContracts` directory then run the build command:

```
npm run build
```

This will produce new files in `dist/` that can be checked in.

## Publishing elf-contracts-typechain

To release and publish the new token list:

First create a new version commit using npm:

```bash
npm version major|minor|patch # this will create a git commit
```

Then push up the changes to Github:

```bash
git push
git push --tags
```

Then in GH:

1. Go to tags
2. Click the ellipses to the far right of the new tag and click "Create release"
3. On the new release, click "Auto-generate release notes" (edit the description if needed)
4. Click "Publish release"
5. Check the Actions tab to monitor the build and publish progress.
