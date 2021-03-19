import ConfirmBtn from "./ConfirmBtn";
import { Meta, Story } from "@storybook/react/types-6-0";
import BackBtn from "./BackBtn";
import RulesBtn from "./RulesBtn";
import StartGameBtn from "./StartGameBtn";
import { ButtonProps } from "./types";
import JoinBtn from "./JoinBtn";

export default {
  title: "Common/Button",
} as Meta;

const Template: Story<ButtonProps> = (args) => <BackBtn {...args} />;

export const Back = Template.bind({});

Back.args = {
  onClick: () => alert("Hello"),
};

export const startgame = () => <StartGameBtn onClick={() => alert("test")} />;
export const rules = () => <RulesBtn onClick={() => alert("test")} />;
export const confirm = () => <ConfirmBtn onClick={() => alert("test")} />;
export const join = () => <JoinBtn onClick={() => alert("test")} />;
