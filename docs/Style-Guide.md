# Elf Coding Practices Guide 🧝‍♂️

An opintionated styling and best practices guide for React and other typescript based projects. The motivation behind this guide is to provide consenous to writing code that is readable, predictable, and reduces noise so it's easier to understand.

_"Code is read 10x more than it's written."_ - Danny

# Best practices

## Pull Requests

- PRs should be small. The review process grows exponentially the larger the PR.
- Large mechinal changes such as file or variable renaming should not be included in feature PRs.
- Branches should be have the author name, example `cashd-voting-bug-fix`, to reduce collisions.
- Since this repo is a monorepo, proper PR titles and flags are necassary.

## Code

- Avoid inline styles, use tailwind or whatever styling framework is chosen for the given project.
- Avoid abberviations in variable names.
- Sentance case for text in buttons and other actionable components.
- Use ttag instead of plain text for any copy.

# Styling

## Prettier

Prettier takes care of most of our syntactical guidelines. This configuration will be inherited in all apps and packages in the monorepo.

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "all",
  "singleQuote": false,
  "semi": true,
  "printWidth": 80
}
```

---

## Components

- Always use functional components, no classes.
- Only **one** functional component per file unless the component is stateless, [eslint/no-multi-comp](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md).
- Stateless components should be in a seperate file is reused.
- Component file names should be in PascalCase, `ExampleInputComponent.tsx`

Components should follow this general structure.

```tsx
// imports
import React from "react";

import logo from "./logo.svg";
import "./App.css";

// constants

// props / types
interface ExampleProps {}

// component
function Example(): React.Element {
  // hooks
  const [text, setText] = useState("");

  // logic

  return (
    <div>
      <input type="text" onChange={() => {}} />
    </div>
  );
}

// utilties

// export
export default Example;
```

### Takeaways

- Use the `function` keyworad declaration for components
- Prop interface should be defined above the component

### Good Examples

- example
- example
- example
- example
- example

Props should be spread in the function parameters

```ts
/* Button.tsx */

interface ButtonProps {
  text: string;
  onClick: () => void;
}

// Good
function Button({ text, onClick }: ButtonProps): React.Element {
  return <button onClick={onClick}>{text}</button>;
}

// Bad
function Button(props: ButtonProps): React.Element {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
}
```

Prop order should have nullables last.

```ts
// Good
interface ExampleProps {
  position: string;
  onClick: () => {};
  title?: string;
}

// Bad
interface ExampleProps {
  position: string;
  title?: string;
  onClick: () => {};
}
```

---

## Function Syntax

Standalone functions should be defined using the `function` keyword.

```ts
/* add.ts */

// Good
function add(a: number, b: number) {
  return a + b;
}

// Bad
const add = (a: number, b: number) => {
  return a + b;
};
```

Inline functions (callbacks, anonymous, props, etc.) should use `arrow function` syntax.

```tsx
/* Button.tsx */

// Good
function Button(): React.Element {
  return (
    <button
      onClick={() => {
        const { data } = fetchData();
        setData(data);
      }}
    >
      Click me
    </button>
  );
}

// Bad
function Button(): React.Element {
  return (
    <button
      onClick={function () {
        const { data } = fetchData();
        setData(data);
      }}
    >
      Click me
    </button>
  );
}
```

Anonymous functions should be one line.

```ts
// Good
const doStuff = () => doThing();

// Bad
const doStuff = () => {
  doThing();
};
```

---

## Imports

Imports should be sorted alphabetically and grouped. The group order is as follows:

- 3rd party packages
- Internal packages `@elementfi/**`
- Local imports
- Relative imports

We are using the [prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports) plugin to enforce and automate this process.

```ts
/* apps/liquiditymining/src/ui/liquiditymining/StakeDialog.tsx */

import { ReactElement, useState } from "react";
import { Signer } from "ethers";
import { commify, parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/core-tokenlist";

import AssetIcon from "src/ui/base/svg/AssetIcon/AssetIcon";
import Button from "src/ui/base/Button/Button";
import H2 from "src/ui/base/H2/H2";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import TokenInput from "src/ui/base/Input/TokenInput";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import { formatAbbreviatedDate } from "src/base/dates";

import { useApprovePool } from "./hooks/useApprovePool";
import { useIsPoolApproved } from "./hooks/useIsPoolApproved";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useStake } from "./hooks/useStake";
```

---

## Comments

- TODO comments should follow this standard ...
- Inline comments are fine as long as line length does not exceed 80 chars.
- Multiline comments should use a comment block.
- Generally it is a good practice to leave a comment if a block raised questions during the review phase.
