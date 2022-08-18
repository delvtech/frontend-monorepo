import * as NextImage from "next/image";
import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "../src/storybook.css";

// Chromatic storybook testing doesn't work well with the default optimized images from next/image.
// Rather than accounting for this in each component, we'll just override next/image import
// and force all consumers to be default unoptimized when storybook runs.
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    "storybook/docs/panel": { index: -1 },
  },
};

addDecorator(withA11y);
