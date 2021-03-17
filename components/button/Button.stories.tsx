import { Meta } from "@storybook/react/types-6-0";
import ConfirmBtn from "./ConfirmBtn";
import RulesBtn from "./RulesBtn";
import StartGameBtn from "./StartGameBtn";

export default {
  title: "Common/Button",
} as Meta;

export const startgame = () => StartGameBtn();
export const rules = () => RulesBtn();

export const confirm = () => ConfirmBtn();
