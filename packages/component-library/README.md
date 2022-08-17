# Component Library

- [Component Library](#component-library)
  - [Peer version requirements](#peer-version-requirements)
  - [Installation](#installation)
  - [Development](#development)
    - [Building Tailwind](#building-tailwind)
    - [Building library w/ Parcel](#building-library-w-parcel)
  - [Resources](#resources)

## Peer version requirements

| `react` |
| ------- |
| ^17.0.2 |

## Installation

Here is how to install the component-library in a project that lives in the
`frontend-monorepo`.

1. Add `@elementfi/component-library` to your project's dependencies, eg:

   ```json
   {
   "dependencies": {
     "@elementfi/component-library": "*",
   }
   ```

2. Run `yarn`.

3. Add the component library's css file to your project.
   For NextJS apps, this will be in `pages/_app.tsx`:
   ```ts
   import "@elementfi/component-library/dist/css/global.css";
   ```

## Development

### Building Tailwind

TODO

### Building library w/ Parcel

TODO

## Resources

- TODO: links to figma where design system is defined
- TODO: links to hosted storybook for components
