import { Meta } from "@storybook/react/types-6-0";
import DiscardPile from "./DiscardPile";
import DrawPile from "./DrawPile";
import TotalScore from "./TotalScore";

export default {
  title: "Common/Gameboard",
} as Meta;

export const drawpile = () => <DrawPile onClick={() => alert("test")} />;
export const discardile = () => <DiscardPile onClick={() => alert("test")} />;
export const totalscore = () => <TotalScore />;
