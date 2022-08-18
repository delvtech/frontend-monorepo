import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Toast as ToastComponent } from "./Toast";

export default {
  title: "Toast",
  component: ToastComponent,
  argTypes: {
    message: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof ToastComponent>;

const Template: ComponentStory<typeof ToastComponent> = (args) => (
  <ToastComponent {...args} />
);

export const Toast = Template.bind({});
Toast.args = {
  message: "Toast",
};
