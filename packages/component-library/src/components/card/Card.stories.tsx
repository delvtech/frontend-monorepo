import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card as CardComponent } from "./Card";

export default {
  title: "Card",
  component: CardComponent,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof CardComponent>;

const Template: ComponentStory<typeof CardComponent> = (args) => (
  <CardComponent {...args} />
);

export const Card = Template.bind({});
Card.args = {
  children: <div>Card</div>,
};
