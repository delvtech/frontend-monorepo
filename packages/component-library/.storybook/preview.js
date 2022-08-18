import * as NextImage from "next/image";
import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "../src/storybook.css";

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
