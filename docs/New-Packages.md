# Adding New Packages

- [Adding New Package](#adding-new-packages)
  - [Motivation](#motivation)
  - [Migrating an Existing Repository](#migrating-an-existing-repository)
  - [Creating a new package from scratch](#fromscratch)
    - [**`Adding directories`**](#adding-directories)
    - [**`Creating the package.json`**](#creating-the-packagejson)
    - [**`Adding linting`**](#adding-linting)
    - [**`Add tsconfig.json`**](#add-tsconfigjson)
    - [**`Setting up Parcel`**](#setting-up-parcel)
    - [**`Copying files, creating the index.ts and building the package`**](#copying-files-creating-the-indexts-and-building-the-package)

## Motivation

There are two main paths for creating a new package or app. This README will cover adding an
existing repo as either and app/ or package/ and also creating one from scratch. The
motivation for adding an existing repo from within the Element ecosystem is to consolidate and share
logic between all the separate repo.

Sometimes you'll want to pull a collection of files out from an app in the apps/ directory, or from
the packages/ directory. The motivation here is to either to improve shareability of code, and to
create more focused packages.

## Migrating an Existing Repository

TODO: fill this out

## From Scratch

If you want to create a new package from scratch the first thing you need to do is create a new
folder under packages/:

### **`Adding directories`**

```bash
frontend-monorepo$ mkdir packages/new-package
```

You'll also want to create a src/ directory

```bash
frontend-monorepo$ cd packages/new-package
frontend-monorepo/package/new-package$ mkdir src/

```

### **`Creating the package.json`**

Then you'll want to run yarn init to create a package.json. Make sure to prefix the package name
with `@elementfi/`

```bash
frontend-monorepo/packages/new-package$ yarn init
```

This should create a package.json that looks something like:

```json
{
  "name": "@elementfi/new-package",
  "version": "1.0.0",
  "description": "A brand new package!",
  "main": "index.js",
  "license": "MIT"
}
```

### **`Adding linting`**

Next you need to set up linting:

```bash
frontend-monorepo$ yarn workspace @elementfi/new-pacakge add eslint@^7 husky lint-staged
```

Edit the package.json, under dev dependencies add:

```json
{
  devDependencies: "@elementfi/eslint-config": "*"
}
```

Now we'll add a couple useful scripts:

```json
{
  "scripts": {
    "prepare": "husky install",
    "lint:w": "eslint --fix '**/*.{js,jsx,ts,tsx,json,md}'",
    "lint": "eslint '**/*.{js,jsx,ts,tsx,json,md}'"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,json,md}": ["eslint --fix"]
  }
}
```

Also add an `.eslintrc` file to the root of new-package:

```config
{
    "extends": "@elementfi/eslint-config"
}
```

Next, run `yarn` at the top level of the frontend-monorepo to install the `@elementfi/eslint-config

```bash
cd ../../
frontend-monorepo$ yarn
```

### **`Adding tsconfig.json`**

Add a `tsconfig.json` file to the root of new-package/:

```bash
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "esnext"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "incremental": true,
    "isolatedModules": true,
    "declaration": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "src/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules"]
}
```

### **`Adding typescript`**

Assuming this is a typescript package, we'll want to add typescript.

```bash
frontend-monorepo$ yarn workspace @elementfi/council-delegates add typescript
```

### **`Setting up Parcel`**

We' also want to add parcel so that we can bundle the package so that we can create an npm package
for it.

```bash
frontend-monorepo$ yarn workspace @elementfi/council-delegates add --dev parcel
```

Add some scripts and a few more things to the package.json to set up parcel:

````json
{
  "main": "dist/main.js",
  "types": "dist/main.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "watch": "parcel watch",
    "build": "parcel build"
  },
  "alias": {
    "src": "./src"
  },
}
```

You should now have a package.json in packages/new-package that looks like:

```json
{
  "name": "@elementfi/new-package",
  "version": "1.0.0",
  "description": "A brand new package!",
  "license": "MIT",
  "source": "src/index.ts",
  "main": "dist/main.js",
  "types": "dist/main.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "prepare": "husky install",
    "lint:w": "eslint --fix '**/*.{js,jsx,ts,tsx,json,md}'",
    "lint": "eslint '**/*.{js,jsx,ts,tsx,json,md}'",
    "watch": "parcel watch",
    "build": "parcel build"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,json,md}": [
      "eslint --fix"
    ]
  },
  "alias": {
    "src": "./src"
  },
  "dependencies": {
    "typescript": "^4.7.3"
  },
  "devDependencies": {
    "@elementfi/eslint-config": "*",
    "eslint": "^7",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.2",
    "parcel": "^2.6.0"
  }
}
````

### **`Copying files, creating the index.ts and building the package`**

Now that the basics are set up, move any files you need into src/ from other packages or apps. Once
the files are copied over, you can remove them from their original package(s) or apps(s). You'll
have to update those apps or packages package.json's dependencies with:

```json
{
  "dependencies": {
    "@elementfi/new-package": "*"
  }
}
```

You'll then need to update the imports to something like:

```ts
import { method } from "@elementfi/new-package";
```

If you just copied the files instead of moving them, you can update imports later as needed. After
copying over all the files you need, you'll need to re export things in index.ts so that parcel can
pick it up:

```ts
// index.ts
import { internalMethod } from "./someFile";

// examples of how to export.  this is mostly what goes in the index.ts
export type { ExportedType } from "./ExportedTypeFile";
export { default as defaultExport } from "./someOtherFile";
export { someMethod } from "./someOtherFile";

// example of exporting a method in index.ts using internal methods
export foo(bar: string) {
  internalMethod(boo);
}
```

Finally, you can build the package by running:

```bash
frontend-monorepo$ yarn workspace @elementfi/new-package build
```

That's it!