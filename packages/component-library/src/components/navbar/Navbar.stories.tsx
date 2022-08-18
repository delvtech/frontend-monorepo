import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Navbar as NavbarComponent } from "./Navbar";

export default {
  title: "Navbar",
  compoennt: NavbarComponent,
} as ComponentMeta<typeof NavbarComponent>;

const Template: ComponentStory<typeof NavbarComponent> = (args) => (
  <NavbarComponent {...args} />
);

export const Navbar = Template.bind({});
Navbar.args = {
  children: <div>Navbar</div>,
};
