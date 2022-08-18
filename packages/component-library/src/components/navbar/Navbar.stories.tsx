import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Navbar as NavbarComponent } from "./Navbar";

export default {
  title: "Navbar",
  component: NavbarComponent,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof NavbarComponent>;

const Template: ComponentStory<typeof NavbarComponent> = (args) => (
  <NavbarComponent {...args} />
);

export const Navbar = Template.bind({});
Navbar.args = {
  children: <div>Navbar</div>,
};
