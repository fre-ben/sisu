import { Meta, Story } from "@storybook/react/types-6-0";
import BackBtn, { ButtonProps } from "./BackBtn";
import RulesBtn from "./RulesBtn";
import StartGameBtn from "./StartGameBtn";

export default {
  title: "Common/Button",
} as Meta;

const Template: Story<ButtonProps> = (args) => <BackBtn {...args} />;

export const Back = Template.bind({});

Back.args = {
  onClick: () => alert("Hello"),
};

export const startgame = () => <StartGameBtn />;
export const rules = () => <RulesBtn />;
