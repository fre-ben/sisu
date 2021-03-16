import { Meta } from "@storybook/react/types-6-0";
import RulesBtn from "./RulesBtn";
import StartGameBtn from "./StartGameBtn";

export default {
  title: "Common/Button",
} as Meta;

export const startgame = () => StartGameBtn();
export const rules = () => RulesBtn();
