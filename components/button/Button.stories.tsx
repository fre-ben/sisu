import ConfirmBtn from "./ConfirmBtn";
import { Meta, Story } from "@storybook/react/types-6-0";
import BackBtn from "./BackBtn";
import RulesBtn from "./RulesBtn";
import StartGameBtn from "./StartGameBtn";
import { JoinBtnProps } from "./types";
import JoinBtn from "./JoinBtn";
import CreateBtn from "./CreateBtn";
import KeepBtn from "./KeepBtn";
import DiscardBtn from "./DiscardBtn";
import ReadyBtn from "./ReadyBtn";
import ExitBtn from "./ExitBtn";
import RestartBtn from "./RestartBtn";
import ContinueBtn from "./Continue";

export default {
  title: "Common/Button",
} as Meta;

const TemplateJoin: Story<JoinBtnProps> = (args) => <JoinBtn {...args} />;

export const Join = TemplateJoin.bind({});

Join.args = {
  onClick: () => alert("Hello"),
  lobbyIsFull: true,
};

export const back = () => <BackBtn />;
export const startgame = () => <StartGameBtn onClick={() => alert("test")} />;
export const rules = () => <RulesBtn onClick={() => alert("test")} />;
export const confirm = () => <ConfirmBtn />;
export const create = () => <CreateBtn onClick={() => alert("test")} />;
export const keep = () => <KeepBtn onClick={() => alert("test")} />;
export const discard = () => <DiscardBtn onClick={() => alert("test")} />;
export const ready = () => <ReadyBtn onClick={() => alert("test")} />;
export const exit = () => <ExitBtn onClick={() => alert("test")} />;
export const restart = () => <RestartBtn onClick={() => alert("test")} />;
export const cont = () => <ContinueBtn onClick={() => alert("test")} />;
