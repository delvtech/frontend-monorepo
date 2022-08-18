import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Accent = Template.bind({});
Accent.args = {
  children: <div>Button</div>,
  variant: "accent",
  size: "normal",
  outline: false,
};

export const Info = Template.bind({});
Info.args = {
  children: <div>Button</div>,
  variant: "info",
  size: "normal",
  outline: false,
};

export const Success = Template.bind({});
Success.args = {
  children: <div>Button</div>,
  variant: "success",
  size: "normal",
  outline: false,
};

export const Error = Template.bind({});
Error.args = {
  children: <div>Button</div>,
  variant: "error",
  size: "normal",
  outline: false,
};

export const Warning = Template.bind({});
Warning.args = {
  children: <div>Button</div>,
  variant: "warning",
  size: "normal",
  outline: false,
};
